// src/utils/seed.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/User");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const Vendor = require("../models/Vendor");
const Transaction = require("../models/Transaction");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB ✅");

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Customer.deleteMany({});
    await Vendor.deleteMany({});
    await Transaction.deleteMany({});

    // Create a demo user
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user = new User({
      username: "DemoUser",
      email: "demo@example.com",
      password: hashedPassword,
      businessName: "Demo Business",
    });
    user.businessId = user._id;
    await user.save();

    // Add products
    const products = [
      { name: "Product A", description: "Demo product A", price: 100, stock: 20, category: "Category 1", businessId: user._id },
      { name: "Product B", description: "Demo product B", price: 200, stock: 15, category: "Category 2", businessId: user._id },
    ];
    const createdProducts = await Product.insertMany(products);

    // Add customers
    const customers = [
      { name: "Customer One", email: "cust1@example.com", phone: "1234567890", businessId: user._id },
      { name: "Customer Two", email: "cust2@example.com", phone: "9876543210", businessId: user._id },
    ];
    const createdCustomers = await Customer.insertMany(customers);

    // Add vendors
    const vendors = [
      { name: "Vendor One", email: "vendor1@example.com", phone: "1112223333", businessId: user._id },
      { name: "Vendor Two", email: "vendor2@example.com", phone: "4445556666", businessId: user._id },
    ];
    const createdVendors = await Vendor.insertMany(vendors);

    // Add transactions (sales and purchases)
    const transactions = [
      {
        type: "sale",
        customerId: createdCustomers[0]._id,
        vendorId: null,
        products: [
          { productId: createdProducts[0]._id, quantity: 2, price: createdProducts[0].price },
          { productId: createdProducts[1]._id, quantity: 1, price: createdProducts[1].price },
        ],
        totalAmount: 2 * createdProducts[0].price + 1 * createdProducts[1].price,
        businessId: user._id,
        date: new Date(),
      },
      {
        type: "purchase",
        customerId: null,
        vendorId: createdVendors[0]._id,
        products: [
          { productId: createdProducts[0]._id, quantity: 5, price: createdProducts[0].price },
        ],
        totalAmount: 5 * createdProducts[0].price,
        businessId: user._id,
        date: new Date(),
      },
    ];
    await Transaction.insertMany(transactions);

    console.log("Seeding completed ✅");
    process.exit();
  } catch (err) {
    console.error("Seeding failed ❌", err);
    process.exit(1);
  }
};

seedData();

