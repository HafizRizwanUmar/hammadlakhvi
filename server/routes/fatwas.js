const router = require('express').Router();
const Fatwa = require('../models/Fatwa');
const auth = require('../middleware/auth');

// GET all fatwas
router.get('/', async (req, res) => {
  try {
    const fatwas = await Fatwa.find().sort({ sequence: 1, createdAt: -1 });
    res.json(fatwas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE fatwa
router.post('/', auth, async (req, res) => {
  try {
    const newFatwa = new Fatwa(req.body);
    const saved = await newFatwa.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE fatwa
router.put('/:id', auth, async (req, res) => {
  try {
    const updated = await Fatwa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE fatwa
router.delete('/:id', auth, async (req, res) => {
  try {
    await Fatwa.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
