const router = require('express').Router();
const Video = require('../models/Video');
const auth = require('../middleware/auth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// GET categorized videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE video entry
router.post('/', auth, upload.single('thumbnail'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.thumbnail = `/uploads/${req.file.filename}`;
    
    // Parse JSON strings if they come from FormData
    ['videos', 'episodes'].forEach(key => {
      if (typeof data[key] === 'string') data[key] = JSON.parse(data[key]);
    });

    const newVideo = new Video(data);
    const saved = await newVideo.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE video entry
router.put('/:id', auth, upload.single('thumbnail'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.thumbnail = `/uploads/${req.file.filename}`;
    
    ['videos', 'episodes'].forEach(key => {
      if (typeof data[key] === 'string') data[key] = JSON.parse(data[key]);
    });

    const updated = await Video.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE video entry
router.delete('/:id', auth, async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
