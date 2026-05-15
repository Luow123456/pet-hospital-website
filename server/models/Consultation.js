const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ['general', 'emergency', 'followup'], default: 'general' },
  status: { type: String, enum: ['open', 'in-progress', 'closed'], default: 'open' },
  reply: String,
  repliedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  createdAt: { type: Date, default: Date.now },
  repliedAt: Date,
});

module.exports = mongoose.model('Consultation', consultationSchema);
