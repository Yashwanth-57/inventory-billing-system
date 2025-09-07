// routes/productRoutes.js
const express = require("express");
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController.js");
const  {authMiddleware } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/", authMiddleware, addProduct);
router.get("/", authMiddleware, getProducts);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;

