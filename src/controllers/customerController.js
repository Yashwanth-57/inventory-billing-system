const Customer = require("../models/Customer");

// Add customer
const addCustomer = async (req, res) => {
  try {
    const customer = new Customer({ ...req.body, businessId: req.user.id });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ message: "Error adding customer", error: err.message });
  }
};

// Get customers
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ businessId: req.user.id });
    if (!customers || customers.length === 0) {
  return res.status(200).json({ message: "No customers found" });
}

    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching customers", error: err.message });
  }
};

// Update customer
const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, businessId: req.user.id },
      req.body,
      { new: true }
    );
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (err) {
    res.status(400).json({ message: "Error updating customer", error: err.message });
  }
};

// Delete customer
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({ _id: req.params.id, businessId: req.user.id });
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting customer", error: err.message });
  }
};

module.exports = { addCustomer, getCustomers, updateCustomer, deleteCustomer };

