const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ["sale", "purchase"], 
    required: [true, "Transaction type is required"] 
  },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, min: [1, "Quantity must be at least 1"] },
      price: { type: Number, required: true, min: [0, "Price must be non-negative"] }
    }
  ],
  totalAmount: { 
    type: Number, 
    required: [true, "Total amount is required"], 
    min: [0, "Total amount must be non-negative"] 
  },
  date: { type: Date, default: Date.now },
  businessId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
