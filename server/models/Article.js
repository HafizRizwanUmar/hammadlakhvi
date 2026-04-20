const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  titleEn: { type: String },
  journal: { type: String },
  year: { type: String },
  lang: { type: String },
  abstract: { type: String },
  category: { type: String },
  authors: { type: String },
  thumbnail: { type: String },
  url: { type: String },
  content: { type: String },
  footnotes: [{
    ref: String,
    text: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Article', ArticleSchema);
