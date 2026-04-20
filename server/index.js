const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/articles');
const videoRoutes = require('./routes/videos');
const metaRoutes = require('./routes/meta');
const inquiryRoutes = require('./routes/inquiries');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/meta', metaRoutes);
app.use('/api/inquiries', inquiryRoutes);

// --- Serving Frontend Build ---
// Assuming the 'dist' folder is inside the root (one level up from 'server')
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// Catch-all route for SPA: serve index.html for any unknown routes
app.get('(.*)', (req, res) => {
  if (req.path.startsWith('/api')) return res.status(404).json({ error: 'API route not found' });
  res.sendFile(path.join(distPath, 'index.html'));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));
