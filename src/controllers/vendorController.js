const Vendor = require("../models/Vendor");

// Add vendor
const addVendor = async (req, res) => {
  try {
    const vendor = new Vendor({ ...req.body, businessId: req.user.id });
    await vendor.save();
    res.status(201).json(vendor);
  } catch (err) {
    res.status(400).json({ message: "Error adding vendor", error: err.message });
  }
};

// Get vendors
const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({ businessId: req.user.id });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching vendors", error: err.message });
  }
};

// Update vendor
const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOneAndUpdate(
      { _id: req.params.id, businessId: req.user.id },
      req.body,
      { new: true }
    );
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.json(vendor);
  } catch (err) {
    res.status(400).json({ message: "Error updating vendor", error: err.message });
  }
};

// Delete vendor
const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOneAndDelete({ _id: req.params.id, businessId: req.user.id });
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.json({ message: "Vendor deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting vendor", error: err.message });
  }
};

module.exports = { addVendor, getVendors, updateVendor, deleteVendor };

