const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        },
        password: {
            type: String,
            required: true
        },
        mobile: {
            type: Number,
            required: true,
            match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
            minlength: 10,
            maxlength: 10,
        },
        session: {
            type: String,
            // required: true
        },
        userId: { 
            type : mongoose.Schema.Types.ObjectId, 
            ref : "User",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", registerSchema);