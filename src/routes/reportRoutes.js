const express = require("express");
const router = express.Router();
const { getTransactionReport, getStockSummary } = require("../controllers/reportController");
const {authMiddleware} = require("../middleware/authMiddleware");

router.get("/transactions", authMiddleware, getTransactionReport);
router.get("/inventory", authMiddleware, getStockSummary);

module.exports = router;

