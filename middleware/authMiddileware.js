const jwt = require("jsonwebtoken");
const registerModel = require("../model/registerModel");

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await registerModel.findById(decoded.user.id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // ✅ Check if session in token matches session in DB
        if (user.session !== decoded.user.session) {
            return res.status(401).json({ message: "Session expired or invalid" });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token failed", error: error.message });
    }
};

module.exports = protect;
