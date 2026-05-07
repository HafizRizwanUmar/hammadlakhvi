const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Video = require('./models/Video');

dotenv.config();

const PAYAM_DATA = [
  {
    id: "payam-2019",
    year: "2019",
    label: "۲۰۱۹",
    type: "PAYAM_SUBAH",
    title: "پیام صبح ۲۰۱۹",
    thumbnail: "/payam2019.jpeg",
    facebookUrl: "https://www.facebook.com/share/1GUoLS5Qvu/",
    episodes: [
      { month: "April 2019", date: "April 9, 2019", topic: "اللّٰہ کی راہ پر راضی رہنا", youtubeId: "Mo-wfqoMiGE" },
      { month: "April 2019", date: "April 16, 2019", topic: "نیکی کسے کہتے ہیں؟", youtubeId: "jVCaKWIyNd8" },
      { month: "June 2019", date: "June 11, 2019", topic: "سفر کے آداب", youtubeId: null },
      { month: "June 2019", date: "June 18, 2019", topic: "شیطان کو سرپرست بنانا", youtubeId: null },
      { month: "July 2019", date: "July 18, 2019", topic: "دین کے پیغام کو آگے پینچانا", youtubeId: "InKOLWNCimI" },
      { month: "July 2019", date: "July 23, 2019", topic: "سورة البقرة أية ٢٥٠", youtubeId: "ktZ0JVKx65U" },
      { month: "July 2019", date: "July 31, 2019", topic: "سورة النمل البقرة أية ١٩", youtubeId: "RGXxW0VIvjg" },
      { month: "August 2019", date: "August 6, 2019", topic: "101 سورة يوسف", youtubeId: "6uw3WqMtELQ" },
      { month: "August 2019", date: "August 21, 2019", topic: "البقرہ ٢٥٠", youtubeId: "v_hcN36Tvas" },
      { month: "August 2019", date: "August 22, 2019", topic: "آل عمران آیت 38 & 39", youtubeId: "LNNgTbZ-Sgw" },
      { month: "August 2019", date: "August 27, 2019", topic: "سورة آل عمران أية 194", youtubeId: "b5q3vgy7qM8" },
      { month: "September 2019", date: "September 16, 2019", topic: "سورة التحريم أية ١١", youtubeId: "vJKGJV-NIwI" },
      { month: "September 2019", date: "September 23, 2019", topic: "سورة القصص أية 16 & 17", youtubeId: "KYZ71RV7ZvM" },
      { month: "October 2019", date: "October 30, 2019", topic: "سیرت کا مطالعہ کیوں ضروری ہے؟", youtubeId: "HdxpZBD3u18" },
      { month: "November 2019", date: "November 4, 2019", topic: "اسوہ رسول صلی اللّٰہ علیہ وآلہ وسلم", youtubeId: "OXtZhQfooCE" },
      { month: "November 2019", date: "November 19, 2019", topic: "النساء آیت 25", youtubeId: "-H7vvZG1kBU" },
      { month: "December 2019", date: "December 30, 2019", topic: "سورة آل الشورى أية ١٩ & ٢٠", youtubeId: "KMMLoHsDFxE" },
    ]
  },
  { id: "payam-2020", year: "2020", label: "۲۰۲۰", type: "PAYAM_SUBAH", title: "پیام صبح ۲۰۲۰", thumbnail: "/payam-2020.jpg", facebookUrl: "https://www.facebook.com/share/p/1AwA1ZwbMo/", episodes: [] },
  { id: "payam-2021", year: "2021", label: "۲۰۲۱", type: "PAYAM_SUBAH", title: "پیام صبح ۲۰۲۱", thumbnail: "/payam-2021.jpg", facebookUrl: "https://www.facebook.com/share/1C6XUADaac/", episodes: [] },
  { id: "payam-2022", year: "2022", label: "۲۰۲۲", type: "PAYAM_SUBAH", title: "پیام صبح ۲۰۲۲", thumbnail: "/payam-2022.jpg", facebookUrl: "https://www.facebook.com/share/p/1DVhDGJz8U/", episodes: [] }
];

async function sync() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB...");

    for (const item of PAYAM_DATA) {
      const existing = await Video.findOne({ id: item.id });
      if (!existing) {
        console.log(`Adding missing entry: ${item.id}`);
        await Video.create(item);
      } else {
        console.log(`Entry already exists: ${item.id}`);
      }
    }

    console.log("Sync complete!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

sync();
