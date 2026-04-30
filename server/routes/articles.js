const router = require('express').Router();
const Article = require('../models/Article');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

// GET all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single article
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findOne({ id: req.params.id });
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE article (Auth required)
router.post('/', auth, upload.single('thumbnail'), async (req, res) => {
  try {
    const articleData = { ...req.body };
    if (req.file) {
      articleData.thumbnail = `/uploads/${req.file.filename}`;
    }
    // Handle footnotes if sent as JSON string
    if (typeof articleData.footnotes === 'string') {
      articleData.footnotes = JSON.parse(articleData.footnotes);
    }
    
    const newArticle = new Article(articleData);
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE article (Auth required)
router.put('/:id', auth, upload.single('thumbnail'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    delete updateData._id; // Prevent immutable _id modification error
    if (req.file) {
      updateData.thumbnail = `/uploads/${req.file.filename}`;
    }
    if (typeof updateData.footnotes === 'string') {
      updateData.footnotes = JSON.parse(updateData.footnotes);
    }

    const updatedArticle = await Article.findOneAndUpdate(
      { id: req.params.id },
      updateData,
      { new: true }
    );
    res.json(updatedArticle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE article (Auth required)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Article.findOneAndDelete({ id: req.params.id });
    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
