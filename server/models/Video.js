const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String }, // Used as 'en' title for series
  type: { type: String, enum: ['CLIP', 'LONG', 'SERIES', 'TV_PROGRAM', 'PAYAM_SUBAH'], required: true },
  
  // Fields for clips/long videos
  duration: { type: String },
  
  // Fields for series/programs
  channel: { type: String },
  channelColor: { type: String },
  thumbnail: { type: String },
  description: { type: String },
  icon: { type: String },
  slug: { type: String },
  useYearlyFormat: { type: Boolean, default: false },
  
  // Array of videos within a series/program
  videos: [{
    id: String,
    title: String,
    ep: String
  }],

  // Special for Payam-e-Subah or yearly structures
  label: { type: String },
  year: { type: String },
  facebookUrl: { type: String },
  episodes: [{
    month: String,
    date: String,
    topic: String,
    dunyanewsUrl: String,
    youtubeId: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Video', VideoSchema);
