const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: [true, "Username is required"], 
      unique: true,
      minlength: [3, "Username must be at least 3 characters long"],
      trim: true
    },
    email: { 
      type: String, 
      required: [true, "Email is required"], 
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"] // regex validation
    },
    password: { 
      type: String, 
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"]
    },
    businessName: { 
      type: String,
      trim: true
    },
    businessId: { 
      type: mongoose.Schema.Types.ObjectId, 
      required: [true, "Business ID is required"], 
      unique: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);


