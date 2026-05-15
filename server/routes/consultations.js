const express = require('express');
const router = express.Router();
const Consultation = require('../models/Consultation');
const auth = require('../middleware/auth');

// Get consultations for logged in user
router.get('/', auth, async (req, res) => {
  try {
    const consultations = await Consultation.find({ user: req.user.id }).populate('repliedBy');
    res.json(consultations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create consultation
router.post('/', auth, async (req, res) => {
  try {
    const consultation = new Consultation({
      user: req.user.id,
      ...req.body,
    });
    await consultation.save();
    res.status(201).json(consultation);
  } catch (err) {
    res.status(400).json({ message: 'Invalid consultation data' });
  }
});

// Reply to consultation
router.post('/:id/reply', async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      {
        reply: req.body.reply,
        status: 'closed',
        repliedAt: new Date(),
      },
      { new: true }
    );
    res.json(consultation);
  } catch (err) {
    res.status(400).json({ message: 'Failed to reply' });
  }
});

module.exports = router;
