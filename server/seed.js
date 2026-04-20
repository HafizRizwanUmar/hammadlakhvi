const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Article = require('./models/Article');
const Video = require('./models/Video');
const User = require('./models/User');
const Meta = require('./models/Meta');

// Static data paths (these are ESM, so we might need a workaround or just copy the objects)
// Since I can read the files, I will hardcode the initial data extraction logic or just copy snippets.
// For the purpose of this script, I'll assume I have the data available.

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // 1. Create Admin User
    await User.deleteMany({});
    const adminUser = new User({
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin12345'
    });
    await adminUser.save();
    console.log('Admin user created.');

    // 2. Clear existing data
    await Article.deleteMany({});
    await Video.deleteMany({});
    await Meta.deleteMany({});

    // 3. Seed Articles (Example from articles.js)
    const initialArticles = [
      {
        id: "dawat-e-deen-khawateen",
        title: "دعوت دین میں خواتین کا کردار",
        titleEn: "The Role of Women in Dawah",
        journal: "N/A",
        year: "2024",
        lang: "urdu",
        abstract: "اس مضمون میں اسلام کی روشنی میں دعوت دین کے حوالے سے خواتین کی ذمہ داریاں اور ان کے اہم کردار کا جائزہ لیا گیا ہے۔",
        category: "Contemporary",
        authors: "Prof. Dr. Muhammad Hammad Lakhvi",
        thumbnail: "/article2.jpeg",
        url: "https://youtu.be/10Ya6NKAy-Q?si=U1nDYqSr2e9BD2ob",
        content: "Content truncated for seed script example..."
      }
    ];
    await Article.insertMany(initialArticles);
    console.log('Articles seeded.');

    // 4. Seed Videos (Simplified extraction from videos.js)
    const initialVideos = [
      { id: "5RuqA4c_8GQ", title: "تفسیر سورۃ الفاتحہ", subtitle: "Tafseer Surah Al-Fatiha", type: "CLIP" },
      { id: "yDa1JTOf0xA", title: "حدیث جبرئیل — کامل درس", subtitle: "Hadith Jibril — Full Explanation", type: "CLIP" },
      {
        id: "khulasa-quran-2026",
        title: "خلاصہ مضامین قرآن | رمضان ۲۰۲۶",
        subtitle: "Khulasa e Mazameen e Quran | Ramadan 2026",
        type: "SERIES",
        channel: "Official Channel",
        thumbnail: "/t1.jpg",
        description: "🎙️ Dr Muhammad Hammad Bin Mohiyudin Lakhvi...",
        videos: [
          { id: "5zZPlHzkFnc", title: "Day 1 | Para 1 | الم", ep: "Day 1" }
        ]
      }
    ];
    await Video.insertMany(initialVideos);
    console.log('Videos seeded.');

    console.log('Seeding completed successfully!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seed();
