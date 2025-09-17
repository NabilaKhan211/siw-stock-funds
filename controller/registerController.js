const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const registerModel = require("../model/registerModel");

exports.register = asyncHandler(async (req, res) => {
    try {
        const {
            fullname,
            email,
            password,
            mobile
        } = req.body;

        if (!fullname || !email || !password || !mobile) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await registerModel.findOne({ email });
        if (existingUser){ 
            return res.status(400).json({ message: "Email already exists" });
        }

        const existingMobile = await registerModel.findOne({ mobile });
        if (existingMobile){
            return res.status(400).json({ message: "Mobile number already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await registerModel.create({
            fullname,
            email,
            password: hashedPassword,
            mobile,
        });

        res.status(200).json({
            success: true,
            message: "Registered successfully",
            user: {
                id: user._id,
                fullname: user.fullname,
            },
        });
    } catch (error) {
        console.error("error:", error);
        res.status(500).json({ message: "error", error: error.message });
    }
});
