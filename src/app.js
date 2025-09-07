// src/app.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // load .env file

const app = express();


const authRoutes = require("./routes/authRoutes");


const productRoutes = require("./routes/productRoutes.js");

const customerRoutes = require("./routes/customerRoutes");

const vendorRoutes = require("./routes/vendorRoutes");

const transactionRoutes = require("./routes/transactionRoutes");

const reportRoutes = require("./routes/reportRoutes");





// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/customers", customerRoutes);
app.use("/vendors", vendorRoutes);
app.use("/transactions", transactionRoutes);
app.use("/reports", reportRoutes);

// Simple test route
app.get("/", (req, res) => {
  res.send("Inventory & Billing Management System API is running ");
});

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    // Start server only after DB is connected
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(" MongoDB connection failed:", err.message);
  });

