const express = require("express");
const router = express.Router();
const registerController = require("../controller/registerController");
const loginController = require("../controller/loginController");
const protect  = require("../middleware/authMiddileware");

// Routes

// User Register
router.post("/register", registerController.register); 

// User Login 
router.post("/login", loginController.loginUser);


// ✅ Protected Route Example (Dashboard)
router.get("/dashboard", protect, (req, res) => {
  res.status(200).json({
    message: `Welcome ${req.user.fullname}`,
    user: {
      id: req.user._id,
      email: req.user.email,
      session: req.user.session,
    },
  });
});

module.exports = router;
