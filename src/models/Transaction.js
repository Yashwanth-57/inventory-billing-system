const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["sale", "purchase"], required: true }, // sale = customer, purchase = vendor
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" }, 
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Transaction", transactionSchema);

