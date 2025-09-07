const express = require("express");
const { addVendor, getVendors, updateVendor, deleteVendor } = require("../controllers/vendorController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addVendor);
router.get("/", authMiddleware, getVendors);
router.put("/:id", authMiddleware, updateVendor);
router.delete("/:id", authMiddleware, deleteVendor);

module.exports = router;

