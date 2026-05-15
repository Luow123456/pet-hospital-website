const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

// Get appointments for logged in user
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id })
      .populate('doctor')
      .populate('pet');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create appointment
router.post('/', auth, async (req, res) => {
  try {
    const appointment = new Appointment({
      user: req.user.id,
      ...req.body,
    });
    await appointment.save();
    await appointment.populate('doctor').populate('pet');
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ message: 'Invalid appointment data' });
  }
});

// Update appointment
router.put('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await appointment.populate('doctor').populate('pet');
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ message: 'Invalid appointment data' });
  }
});

// Cancel appointment
router.delete('/:id', auth, async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
