const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String },
  description: { type: String },
  type: { type: String }, // e.g., 'Special', 'Regular', 'Conference'
  icon: { type: String },
  color: { type: String },
  videoId: { type: String },
  details: [{ type: String }],
  gallery: [{
    label: { type: String }, // e.g., 'Day 1', 'Day 2'
    images: [{
      url: { type: String },
      title: { type: String }
    }]
  }],
  galleryMode: { type: String, default: 'DAYS' }, // 'DAYS' or 'GALLERY'
  recurring: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
