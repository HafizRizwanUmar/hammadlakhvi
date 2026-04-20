const mongoose = require('mongoose');

const MetaSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g., 'biography', 'contact'
  value: { type: mongoose.Schema.Types.Mixed, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Meta', MetaSchema);
