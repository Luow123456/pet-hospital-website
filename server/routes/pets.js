const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const Record = require('../models/Record');
const auth = require('../middleware/auth');

// Get all pets for logged in user
router.get('/', auth, async (req, res) => {
  try {
    const pets = await Pet.find({ user: req.user.id });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create pet
router.post('/', auth, async (req, res) => {
  try {
    const pet = new Pet({
      user: req.user.id,
      ...req.body,
    });
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    res.status(400).json({ message: 'Invalid pet data' });
  }
});

// Update pet
router.put('/:id', auth, async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(pet);
  } catch (err) {
    res.status(400).json({ message: 'Invalid pet data' });
  }
});

// Delete pet
router.delete('/:id', auth, async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pet deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get pet records
router.get('/:id/records', auth, async (req, res) => {
  try {
    const records = await Record.find({ pet: req.params.id }).populate('doctor');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
