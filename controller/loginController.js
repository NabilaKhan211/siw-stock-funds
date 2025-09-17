const asyncHandler = require("express-async-handler");
const registerModel = require("../model/registerModel");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");


exports.loginUser = asyncHandler(async (req, res) => {
    try{
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Find user by email and passsword
  const user = await registerModel.findOne({ email});
  console.log(user)
  if (!user) {
    return res.status(400).json({ success: false, message: "Invalid Email!" });
  }

  // Generate a new unique session ID
  const session = uuidv4();

 // Update user's session in the database
        user.session = session;
        await user.save();

  // Generate JWT token
  const token = jwt.sign(
    {
      user: {
        username: user.fullname,
        email: user.email,
        id: user._id,
        session: session
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: "1hr" }
  );

  // Send success response
  res.status(200).json({
    success: true,
    message: "Login successful",
    session,
    user: {
      fullname: user.fullname,
    },
    accessToken: token,
  });
}catch (error){
    res.status(500).json({ success: false, message: error.message });
}
});