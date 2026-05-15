const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create order
router.post('/orders', auth, async (req, res) => {
  try {
    const order = new Order({
      user: req.user.id,
      ...req.body,
    });
    await order.save();
    await order.populate('product');
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: 'Invalid order data' });
  }
});

// Get user's orders
router.get('/orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
