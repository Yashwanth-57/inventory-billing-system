const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const generateToken = require("../utils/generateToken");
const errorResponse = require("../utils/errorResponse");



// Signup
 const register = async (req, res) => {
  try {
    const { username, email, password, businessName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
     // return res.status(400).json({ message: "User already exists" });
      return errorResponse(res, 400, "User already exixts");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate new ObjectId for businessId
    const businessId = new mongoose.Types.ObjectId();

    // Save user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      businessName,
       businessId: undefined,
    });
    newUser.businessId = newUser._id;


    await newUser.save();

    res.status(201).json({ message: "User registered successfully ", businessId });
  } catch (err) {
    console.error(err);
    return errorResponse(res, 404, "Server error");
    
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
     // return res.status(400).json({ message: "Invalid email or password" });
       return errorResponse(res, 400, "Invalid email or password");
      
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
     // return res.status(400).json({ message: "Invalid email or password" });
      return errorResponse(res, 400, "Inavalid email or password");
    }

    // Generate JWT
   const token = generateToken(user._id);


    res.json({ message: "Login successful ", token });
  } catch (err) {
    console.error(err);
   // res.status(500).json({ message: "Server error" });
    return errorResponse(res, 500, "Server error");
  }
};


// Logout user
const logout = async (req, res) => {
  try {
    // In JWT, logout is handled client-side by deleting token
    return res.json({ message: "Logged out successfully. Please remove token on client side." });
  } catch (err) {
    res.status(500).json({ message: "Error during logout", error: err.message });
   // return errorResponse(res, 500, "");
  }
};

module.exports = { register, login, logout };



