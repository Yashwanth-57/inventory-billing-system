const Product = require("../models/Product");

// Add product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      businessId: req.user.id   
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "Error adding product", error: err.message });
  }
};


const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ businessId: req.user.id });

    console.log("Products found:", products, );
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};




const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
};

module.exports = { addProduct, getProducts, updateProduct, deleteProduct };
