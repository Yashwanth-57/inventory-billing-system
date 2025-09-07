const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Vendor name is required"], 
    trim: true 
  },
  email: { 
    type: String, 
    unique: true, 
    sparse: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"] 
  },
  phone: { 
    type: String, 
    match: [/^\d{10}$/, "Phone number must be 10 digits"] 
  },
  address: { type: String, trim: true },
  businessId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model("Vendor", vendorSchema);


