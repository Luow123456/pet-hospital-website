const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, default: Date.now },
  diagnosis: String,
  treatment: String,
  prescription: String,
  notes: String,
  followUp: Date,
});

module.exports = mongoose.model('Record', recordSchema);
