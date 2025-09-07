const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Customer name is required"], 
    trim: true 
  },
  email: { 
    type: String, 
    unique: true, 
    sparse: true, // allows multiple customers without email
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

module.exports = mongoose.model("Customer", customerSchema);


