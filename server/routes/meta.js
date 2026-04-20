const router = require('express').Router();
const Meta = require('../models/Meta');
const auth = require('../middleware/auth');

// GET meta by key
router.get('/:key', async (req, res) => {
  try {
    const meta = await Meta.findOne({ key: req.params.key });
    if (!meta) return res.status(404).json({ message: 'Meta not found' });
    res.json(meta.value);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE or UPDATE meta (Auth required)
router.post('/:key', auth, async (req, res) => {
  try {
    const { value } = req.body;
    const meta = await Meta.findOneAndUpdate(
      { key: req.params.key },
      { value },
      { upsert: true, new: true }
    );
    res.json(meta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
