const mongoose = require('mongoose');
require('dotenv').config();
const Meta = require('./models/Meta');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected');
  
  // Delete existing biography to force defaults
  await Meta.deleteOne({ key: 'biography' });
  console.log('Old biography deleted. Now open the dashboard Biography page and click "Update All Sections" to save the defaults.');
  process.exit();
}
run();
