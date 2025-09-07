const express = require("express");
const { addTransaction, getTransactions } = require("../controllers/transactionController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addTransaction);
router.get("/", authMiddleware, getTransactions);

module.exports = router;

