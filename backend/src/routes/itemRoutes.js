const express = require("express");
const mongoose = require("mongoose");
const Item = require("../models/Item");

const router = express.Router();

// GET /api/items - get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch items" });
  }
});

// GET /api/items/:id - get one item
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch item" });
  }
});

// POST /api/items - create an item
router.post("/", async (req, res) => {
  try {
    const { name, category, quantity, price, description } = req.body;
    const item = await Item.create({ name, category, quantity, price, description });
    res.status(201).json(item);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Could not create item" });
  }
});

// PUT /api/items/:id - update an item
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }
    const allowedFields = ["name", "category", "quantity", "price", "description"];
    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    const item = await Item.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Could not update item" });
  }
});

// DELETE /api/items/:id - delete an item
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted successfully", id: item._id });
  } catch (error) {
    res.status(500).json({ message: "Could not delete item" });
  }
});

module.exports = router;
