const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // 👈 add this
});

module.exports = mongoose.model("Product", productSchema);


