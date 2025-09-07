const Transaction = require("../models/Transaction");
const Product = require("../models/Product");

// Get transaction summary (sales, purchases, revenue)
const getTransactionReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const businessId = req.user.businessId;

    const filter = { businessId };

    if (startDate && endDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filter.date = { $gte: start, $lte: end };
    }

    const transactions = await Transaction.find(filter);

    let totalSales = 0;
    let totalPurchases = 0;

    transactions.forEach(tx => {
      if (tx.type === "sale") totalSales += tx.totalAmount;
      if (tx.type === "purchase") totalPurchases += tx.totalAmount;
    });

    const revenue = totalSales - totalPurchases;

    res.json({ totalSales, totalPurchases, revenue, transactionsCount: transactions.length });
  } catch (err) {
    console.error("Error generating report:", err);
    res.status(500).json({ message: "Error generating report", error: err.message });
  }
};

// Get stock summary
const getStockSummary = async (req, res) => {
  try {
    const businessId = req.user.businessId;
    const lowStockThreshold = 5; // configurable

    const products = await Product.find({ businessId });

    const lowStock = products.filter(p => p.stock <= lowStockThreshold);

    res.json({ totalProducts: products.length, lowStockCount: lowStock.length, lowStock });
  } catch (err) {
    console.error("Error fetching stock summary:", err);
    res.status(500).json({ message: "Error fetching stock summary", error: err.message });
  }
};

module.exports = { getTransactionReport, getStockSummary };



