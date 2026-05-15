const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  breed: String,
  age: Number,
  weight: Number,
  color: String,
  microchipId: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pet', petSchema);
