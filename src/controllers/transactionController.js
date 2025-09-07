const Transaction = require("../models/Transaction");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const Vendor = require("../models/Vendor");

// Add a new transaction
const addTransaction = async (req, res) => {
  try {
    const { type, customerId, vendorId, products } = req.body;
    const businessId = req.user.businessId; // use businessId from JWT

    if (!["sale", "purchase"].includes(type))
      return res.status(400).json({ message: "Invalid transaction type" });

    if (type === "sale") {
      const customer = await Customer.findOne({ _id: customerId, businessId });
      if (!customer) return res.status(400).json({ message: "Invalid customer ID" });
    }

    if (type === "purchase") {
      const vendor = await Vendor.findOne({ _id: vendorId, businessId });
      if (!vendor) return res.status(400).json({ message: "Invalid vendor ID" });
    }

    let totalAmount = 0;

    for (let item of products) {
      const product = await Product.findOne({ _id: item.productId, businessId });
      if (!product) return res.status(400).json({ message: `Invalid product ID: ${item.productId}` });

      if (type === "sale") {
        if (product.stock < item.quantity)
          return res.status(400).json({ message: `Not enough stock for ${product.name}` });
        product.stock -= item.quantity;
      } else if (type === "purchase") {
        product.stock += item.quantity;
      }

      await product.save();
      totalAmount += item.quantity * item.price;
    }

    const transaction = new Transaction({
      type,
      customerId: type === "sale" ? customerId : null,
      vendorId: type === "purchase" ? vendorId : null,
      products,
      totalAmount,
      date: new Date(),
      businessId,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    console.error("Error adding transaction:", err);
    res.status(500).json({ message: "Error adding transaction", error: err.message });
  }
};

// Get transactions
const getTransactions = async (req, res) => {
  try {
    const { type, date } = req.query;
    const businessId = req.user.businessId; // from JWT
    const filter = { businessId };

    if (type) filter.type = type;
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      filter.date = { $gte: start, $lte: end };
    }

    const transactions = await Transaction.find(filter).populate("products.productId customerId vendorId");
    res.json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ message: "Error fetching transactions", error: err.message });
  }
};

module.exports = { addTransaction, getTransactions };

