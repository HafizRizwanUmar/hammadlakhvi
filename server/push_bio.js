const mongoose = require('mongoose');
require('dotenv').config();
const Meta = require('./models/Meta');

const sections = require('./bio_data.json');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected. Sections count:', sections.length);
  await Meta.findOneAndUpdate(
    { key: 'biography' },
    { value: sections },
    { upsert: true, new: true }
  );
  console.log('Biography saved successfully with', sections.length, 'sections!');
  process.exit();
}
run();
