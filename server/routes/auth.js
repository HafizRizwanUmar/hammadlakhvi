const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User does not exist' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { username: user.username } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify token (useful for frontend protection)
router.get('/verify', async (req, res) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ valid: false });

  try {
    const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    res.json({ valid: true, user: verified });
  } catch (err) {
    res.json({ valid: false });
  }
});

module.exports = router;
