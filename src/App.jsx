import { useState, useEffect } from "react";

const COLORS = {
  cream: "#FAF6EF",
  gold: "#B8972A",
  goldLight: "#D4AF37",
  darkGreen: "#1A3A2A",
  green: "#2C5F3F",
  greenLight: "#3D7A55",
  charcoal: "#1C1C1C",
  text: "#2D2D2D",
  textLight: "#6B6B6B",
  border: "#E8DCC8",
  white: "#FFFFFF",
};

const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Noto+Nastaliq+Urdu:wght@400;600;700&display=swap');
`;

const globalStyle = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${COLORS.cream}; font-family: 'Libre Baskerville', serif; color: ${COLORS.text}; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${COLORS.cream}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.gold}; border-radius: 3px; }
  .urdu { font-family: 'Noto Nastaliq Urdu', serif; direction: rtl; text-align: right; line-height: 2.2; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes shimmer { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
  @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes glowPulse { 0%,100% { box-shadow: 0 0 0 0px rgba(212,175,55,0.4), 0 12px 48px rgba(0,0,0,0.5); } 50% { box-shadow: 0 0 0 14px rgba(212,175,55,0.08), 0 12px 48px rgba(0,0,0,0.5); } }
  .article-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important; }
  .article-card { transition: all 0.2s ease; cursor: pointer; }
  .series-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.15) !important; }
  .series-card { transition: all 0.25s ease; cursor: pointer; }
  .event-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,0.12) !important; }
  .event-card { transition: all 0.25s ease; cursor: pointer; }
  .tv-program-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.12) !important; }
  .tv-program-card { transition: all 0.25s ease; cursor: pointer; }
  @media (max-width: 820px) {
    .hero-layout { flex-direction: column !important; align-items: center !important; padding: 60px 24px !important; }
    .hero-text { align-items: center !important; text-align: center !important; }
    .hero-text .urdu { text-align: center !important; }
    .hero-pic { width: 220px !important; height: 280px !important; }
    .hero-creds { justify-content: center !important; }
    .hero-btns { justify-content: center !important; }
  }
`;

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "biography", label: "Biography" },
  { id: "shorts", label: "Short Clips" },
  { id: "lectures", label: "Lectures" },
  { id: "articles", label: "Articles" },
  { id: "fatwa", label: "Q&A / Fatwas" },
  { id: "events", label: "Events" },
  { id: "community", label: "Community" },
  { id: "contact", label: "Contact" },
];

const SHORT_CLIPS = [
  { id: "5RuqA4c_8GQ", title: "تفسیر سورۃ الفاتحہ", subtitle: "Tafseer Surah Al-Fatiha" },
  { id: "yDa1JTOf0xA", title: "حدیث جبرئیل — کامل درس", subtitle: "Hadith Jibril — Full Explanation" },
  { id: "nmBwd3MkPSY", title: "توحید کا مفہوم و اہمیت", subtitle: "Concept & Importance of Tawheed" },
  { id: "HBbQMQkz3GE", title: "نماز — اہمیت اور فضائل", subtitle: "Salah — Significance & Virtues" },
  { id: "S5PkGChDv9U", title: "رمضان المبارک کی تیاری", subtitle: "Preparing for Ramadan" },
  { id: "Xk4uGYkbBFg", title: "اسلام میں صبر کا مقام", subtitle: "The Station of Patience in Islam" },
];

const LONG_VIDEOS = [
  { id: "5RuqA4c_8GQ", title: "تفسیر القرآن — مکمل درس سلسلہ", subtitle: "Complete Tafseer Series — Pegham TV", duration: "45 min" },
  { id: "yDa1JTOf0xA", title: "حدیث اور علوم حدیث — جامع درس", subtitle: "Sciences of Hadith — Full Lecture", duration: "60 min" },
  { id: "nmBwd3MkPSY", title: "اسلامی فلسفہ اور مغربی فکر", subtitle: "Islamic Philosophy vs Western Thought", duration: "52 min" },
  { id: "HBbQMQkz3GE", title: "مسلم خاندانی نظام", subtitle: "Islamic Family System — University Lecture", duration: "70 min" },
];

const LECTURE_SERIES = [
  {
    id: "tafseer",
    title: "تفسیر القرآن",
    en: "Tafseer Al-Quran",
    channel: "Pegham TV",
    thumbnail: "/series-tafseer.jpg",
    description: "Weekly Tafseer of the Holy Quran. Verse-by-verse explanation covering linguistic, jurisprudential and contemporary perspectives.",
    count: 6,
    videos: [
      { id: "5RuqA4c_8GQ", title: "تفسیر سورۃ الفاتحہ", ep: "Ep. 1" },
      { id: "yDa1JTOf0xA", title: "تفسیر سورۃ البقرہ — آغاز", ep: "Ep. 2" },
      { id: "nmBwd3MkPSY", title: "تفسیر سورۃ البقرہ — آیات 1–20", ep: "Ep. 3" },
      { id: "HBbQMQkz3GE", title: "تفسیر سورۃ البقرہ — آیات 21–40", ep: "Ep. 4" },
      { id: "S5PkGChDv9U", title: "تفسیر سورۃ آل عمران", ep: "Ep. 5" },
      { id: "Xk4uGYkbBFg", title: "تفسیر سورۃ النساء", ep: "Ep. 6" },
    ],
  },
  {
    id: "hadith",
    title: "حدیث و علوم حدیث",
    en: "Hadith Sciences",
    channel: "Peace TV",
    thumbnail: "/series-hadith.jpg",
    description: "In-depth study of Hadith sciences including methodology, authentication, and commentary on major Hadith collections.",
    count: 5,
    videos: [
      { id: "5RuqA4c_8GQ", title: "علوم حدیث — تعارف", ep: "Ep. 1" },
      { id: "yDa1JTOf0xA", title: "حدیث جبرئیل — مکمل تشریح", ep: "Ep. 2" },
      { id: "nmBwd3MkPSY", title: "صحیح بخاری — اہمیت و مقام", ep: "Ep. 3" },
      { id: "HBbQMQkz3GE", title: "حدیث کی اقسام و درجات", ep: "Ep. 4" },
      { id: "S5PkGChDv9U", title: "رجال الحدیث — تعارف", ep: "Ep. 5" },
    ],
  },
  {
    id: "islahiat",
    title: "اصلاحی دروس",
    en: "Spiritual Reform Lectures",
    channel: "Pegham TV",
    thumbnail: "/series-islahiat.jpg",
    description: "Lectures on spiritual reform, character building, and practical Islamic guidance for the contemporary Muslim.",
    count: 5,
    videos: [
      { id: "S5PkGChDv9U", title: "توبہ اور رجوع الی اللہ", ep: "Ep. 1" },
      { id: "Xk4uGYkbBFg", title: "صبر اور شکر — ایمان کی بنیاد", ep: "Ep. 2" },
      { id: "5RuqA4c_8GQ", title: "دعا — مومن کا ہتھیار", ep: "Ep. 3" },
      { id: "yDa1JTOf0xA", title: "ذکر اللہ کی فضیلت", ep: "Ep. 4" },
      { id: "nmBwd3MkPSY", title: "اخلاق اور تزکیہ نفس", ep: "Ep. 5" },
    ],
  },
  {
    id: "aqeedah",
    title: "عقیدہ اسلامیہ",
    en: "Islamic Creed & Theology",
    channel: "Lahore News",
    thumbnail: "/series-aqeedah.jpg",
    description: "Systematic study of Islamic theology — Tawheed, Prophethood, Angels, Divine Books, Day of Judgment, and Divine Decree.",
    count: 4,
    videos: [
      { id: "HBbQMQkz3GE", title: "توحید — بنیادی تصور", ep: "Ep. 1" },
      { id: "S5PkGChDv9U", title: "ختم نبوت — دلائل و براہین", ep: "Ep. 2" },
      { id: "Xk4uGYkbBFg", title: "تقدیر کا فلسفہ", ep: "Ep. 3" },
      { id: "5RuqA4c_8GQ", title: "آخرت — حشر و نشر", ep: "Ep. 4" },
    ],
  },
  {
    id: "walidayn",
    title: "والدین کی ذمہ داریاں",
    en: "Walidayn Ki Zimaydaarian",
    channel: "Official Channel",
    thumbnail: "/thumbnail1.jpg",
    description: "A comprehensive 9-part series on the responsibilities of parents in Islam, covering spiritual, educational, and social dimensions.",
    count: 9,
    videos: [
      { id: "x04g-Hg8POo", title: "Walidayn Ki Zimaydaarian - Part 1", ep: "Part 1" },
      { id: "iJo7_Cvdlbs", title: "Walidayn Ki Zimaydaarian - Part 2", ep: "Part 2" },
      { id: "Je-KTWMYmpo", title: "Walidayn Ki Zimaydaarian - Part 3", ep: "Part 3" },
      { id: "d4cRFz7OvBI", title: "Walidayn Ki Zimaydaarian - Part 4", ep: "Part 4" },
      { id: "naDC7UYChZg", title: "Walidayn Ki Zimaydaarian - Part 5", ep: "Part 5" },
      { id: "IFj7NOIQMyE", title: "Walidayn Ki Zimaydaarian - Part 6", ep: "Part 6" },
      { id: "U-9VVg-ngFc", title: "Walidayn Ki Zimaydaarian - Part 7", ep: "Part 7" },
      { id: "PUWNhcOILUU", title: "Walidayn Ki Zimaydaarian - Part 8", ep: "Part 8" },
      { id: "OECVk9qvY-A", title: "Walidayn Ki Zimaydaarian - Part 9", ep: "Part 9" },
    ],
  },
];

const ARTICLES = [
  { title: "مطالعہ سیرت کا مادی منہج", journal: "Al-Qalam, Punjab University", year: "2017", lang: "urdu", abstract: "اس مقالے میں سیرت النبی کے مطالعے کے مادی پہلوؤں کا تجزیہ کیا گیا ہے اور اسلامی نقطہ نظر سے اس کا جائزہ لیا گیا ہے۔", pages: "181–207", category: "Seerah" },
  { title: "A Glimpse in the History of Nationalism in Muslim World", journal: "Al-Adhwa, P.U. LHR", year: "2014", lang: "en", abstract: "Explores the historical emergence of nationalist movements in Muslim-majority territories and their tension with pan-Islamic identity.", pages: "21–36", category: "History" },
  { title: "Faith in Predestination and its Philosophy — An Islamic Perspective", journal: "Al-Adhwa, P.U. LHR", year: "2010", lang: "en", abstract: "A philosophical analysis of the Islamic doctrine of Qadar (divine decree), examining it through classical and contemporary scholarly lenses.", pages: "1–10", category: "Theology" },
  { title: "Islam and Fertility Regulations", journal: "WASET e-Journal, France", year: "2010", lang: "en", abstract: "Examines Islamic jurisprudential positions on population policy and fertility regulation in the modern state context.", pages: "640–642", category: "Fiqh" },
  { title: "تصور جلال — اقبال اور رومانوی مفکرین کا تقابلی مطالعہ", journal: "Al-Qalam, Punjab University", year: "2016", lang: "urdu", abstract: "اقبال کے تصور جلال کا رومانوی مغربی مفکرین کے خیالات سے موازنہ۔", pages: "222–231", category: "Philosophy" },
  { title: "The Concept of Peace and Security in Islam", journal: "McGill University Canada — Book Chapter", year: "2008", lang: "en", abstract: "Published in 'The World's Religions after September 11' edited by Arvind Sharma. Presents the Quranic and Prophetic framework for peace.", pages: "83–86", category: "Peace Studies" },
  { title: "بین المذاہب ہم آہنگی اور رواداری", journal: "Al-Qalam, Punjab University", year: "2010", lang: "urdu", abstract: "بین المذاہب ہم آہنگی کے قرآن و سنت پر مبنی اصول اور عصر حاضر میں ان کا اطلاق۔", pages: "122–139", category: "Interfaith" },
  { title: "Psychological Aspects of Harassment at Workplace — Islamic Remedies", journal: "Pakistan Journal of Islamic Philosophy", year: "2022", lang: "en", abstract: "Analyses workplace harassment through Islamic ethical and psychological frameworks, proposing remedies rooted in Shariah principles.", pages: "1–20", category: "Ethics" },
  { title: "The Economic Terminologies of Shah Waliullah — A Critical Analysis", journal: "International Journal of Special Education", year: "2022", lang: "en", abstract: "Critically examines the economic vocabulary and concepts employed by Shah Waliullah Dehlvi in his major works.", pages: "3026–3040", category: "Economics" },
  { title: "Introduction, History, Dangers and Challenges of Cyber Crimes", journal: "Al-Qalam, P.U. LHR", year: "2020", lang: "en", abstract: "Explores cybercrime from an Islamic legal perspective, offering guidance on digital ethics and the responsibilities of Muslim scholars.", pages: "167–183", category: "Contemporary" },
  { title: "Methodology of Tafseer e Muhammadi", journal: "Al-Qalam, P.U. LHR", year: "2008", lang: "en", abstract: "Examines the exegetical methodology of Tafseer Muhammadi with comparative study of contemporary Quranic interpretations.", pages: "1–30", category: "Tafseer" },
  { title: "The Holy Prophet (SAW) as a Messenger of Peace", journal: "Al-Adhwa, P.U. LHR", year: "2008", lang: "en", abstract: "Documents the Prophet's role as an ambassador of peace across religious, political and social dimensions.", pages: "1–16", category: "Seerah" },
];

const FATWAS = [
  { q: "Is cryptocurrency permissible in Islam?", a: "This is a matter of scholarly debate. Contemporary scholars differ based on whether digital currencies fulfill the conditions of valid exchange. Please consult the full recorded lecture for a detailed analysis." },
  { q: "What is the ruling on combining prayers while traveling?", a: "Combining prayers (Jam'a) is permissible during travel according to the established Sunnah. The Hanafi, Shafi'i, Maliki and Hanbali schools differ on specific conditions." },
  { q: "Can women attend Friday prayers at the mosque?", a: "Women's attendance at mosques has strong evidence in primary Islamic sources. Our research article 'Attendance of Women in Mosques' (2018) provides a comprehensive legal analysis." },
];

// ── EVENTS DATA — now with detail pages ──────────────────────────────────────
const EVENTS_DATA = [
  {
    id: "ev1",
    date: "Every Friday",
    title: "Friday Khutbah — Masjid Al-Mubarak Lahore",
    type: "Regular",
    recurring: true,
    icon: "🕌",
    location: "Masjid Al-Mubarak, Lahore",
    description: "Dr. Lakhvi has been delivering the Friday Khutbah and leading Jumu'ah prayers at Masjid Al-Mubarak, Lahore since 2009. The khutbahs cover contemporary Islamic issues, Quranic themes, and practical guidance for Muslims.",
    details: [
      "Weekly Friday Khutbah since 2009",
      "Covers Quranic themes and contemporary issues",
      "Open to all Muslims — brothers and sisters welcome",
      "Masjid Al-Mubarak, Lahore",
    ],
    images: [],
    color: COLORS.gold,
  },
  {
    id: "ev2",
    date: "Every Saturday",
    title: "Weekly Tafseer Al-Quran — Pegham TV Live",
    type: "TV Program",
    recurring: true,
    icon: "📺",
    location: "Pegham TV Studio, Lahore / Online",
    description: "Since 2015, Dr. Lakhvi has been delivering a weekly Tafseer Al-Quran program on Pegham TV. The program is broadcast live and reaches audiences across Pakistan and internationally. Verse-by-verse explanation with contemporary relevance.",
    details: [
      "Weekly broadcast since 2015 on Pegham TV",
      "Live and available on YouTube & Facebook",
      "Verse-by-verse Quranic exegesis",
      "Millions of viewers worldwide",
    ],
    images: [],
    color: COLORS.green,
  },
  {
    id: "ev3",
    date: "5 April 2026",
    title: "International Islamic Studies Conference — Islamabad",
    type: "Conference",
    recurring: false,
    icon: "🎓",
    location: "Islamabad, Pakistan",
    description: "Dr. Lakhvi will present a research paper at this international conference bringing together Islamic scholars and academics from across the Muslim world to discuss contemporary challenges and solutions from an Islamic perspective.",
    details: [
      "International scholars from 20+ countries",
      "Research paper presentation by Dr. Lakhvi",
      "Themes: Contemporary Islamic Jurisprudence",
      "Venue: Islamabad Convention Centre",
    ],
    images: [],
    color: COLORS.darkGreen,
  },
  {
    id: "ev4",
    date: "12 April 2026",
    title: "Faith Welfare Foundation Annual Gathering",
    type: "Community",
    recurring: false,
    icon: "🤝",
    location: "Lahore, Pakistan",
    description: "The annual gathering of Faith Welfare Foundation, founded by Dr. Lakhvi in 2024. The event celebrates the foundation's social and educational welfare initiatives, recognizes volunteers, and outlines future programs for the community.",
    details: [
      "Annual gathering of Faith Welfare Foundation",
      "Founded by Dr. Lakhvi — Est. 2024",
      "Social & educational welfare programs",
      "Community recognition and award ceremony",
    ],
    images: [],
    color: "#8B6914",
  },
  {
    id: "ev5",
    date: "Every Saturday",
    title: "Online Tafseer Halqa — Zoom",
    type: "Online",
    recurring: true,
    icon: "💻",
    location: "Online (Zoom)",
    description: "An interactive online Tafseer circle open to students and seekers of Islamic knowledge worldwide. Participants can ask questions and engage directly with Dr. Lakhvi's Quranic teachings in a structured learning environment.",
    details: [
      "Open to all students of Islamic knowledge",
      "Interactive Q&A format",
      "Register via the contact form",
      "Available globally via Zoom",
    ],
    images: [],
    color: COLORS.greenLight,
  },
];

// ── TV PROGRAMS DATA — now with detail/video pages ───────────────────────────
const TV_PROGRAMS_DATA = [
  {
    id: "tv1",
    icon: "📖",
    name: "تفسیر القرآن",
    en: "Tafseer Al-Quran",
    channel: "Pegham TV",
    channelColor: "#1A5C3A",
    description: "Weekly verse-by-verse Quranic exegesis covering linguistic, jurisprudential, and contemporary perspectives. Broadcast since 2015, reaching millions worldwide.",
    videos: [
      { id: "5RuqA4c_8GQ", title: "تفسیر سورۃ الفاتحہ", ep: "Episode 1" },
      { id: "yDa1JTOf0xA", title: "تفسیر سورۃ البقرہ", ep: "Episode 2" },
      { id: "nmBwd3MkPSY", title: "تفسیر سورۃ آل عمران", ep: "Episode 3" },
      { id: "HBbQMQkz3GE", title: "تفسیر سورۃ النساء", ep: "Episode 4" },
    ],
  },
  {
    id: "tv2",
    icon: "🌅",
    name: "پیام صبح",
    en: "Payam-e-Subah",
    channel: "Dunya News",
    channelColor: "#C8102E",
    description: "Morning spiritual program offering daily Islamic guidance, Quranic verses, and motivational insights to start the day with faith and purpose.",
    facebookVideos: [
      { year: "2019", url: "https://www.facebook.com/share/1GUoLS5Qvu/", title: "پیام صبح ۲۰۱۹", label: "2019 Program" },
      { year: "2020", url: "https://www.facebook.com/share/p/1AwA1ZwbMo/", title: "پیام صبح ۲۰۲۰", label: "2020 Program" },
      { year: "2021", url: "https://www.facebook.com/share/1C6XUADaac/", title: "پیام صبح ۲۰۲۱", label: "2021 Program" },
      { year: "2022", url: "https://www.facebook.com/share/p/1DVhDGJz8U/", title: "پیام صبح ۲۰۲۲", label: "2022 Program" },
    ],
    videos: [],
  },
  {
    id: "tv3",
    icon: "🙏",
    name: "دعا مومن کا ہتھیار",
    en: "Dua — The Believer's Weapon",
    channel: "Peace TV",
    channelColor: "#0066CC",
    description: "A program on the spiritual significance, etiquette, and power of supplication (Dua) in Islam. Explores Quranic duas and prophetic supplications.",
    videos: [
      { id: "5RuqA4c_8GQ", title: "دعا کی اہمیت اور فضیلت", ep: "Episode 1" },
      { id: "yDa1JTOf0xA", title: "قرآنی دعائیں", ep: "Episode 2" },
      { id: "nmBwd3MkPSY", title: "نبوی دعائیں", ep: "Episode 3" },
    ],
  },
  {
    id: "tv4",
    icon: "💡",
    name: "اسلام اور الحاد",
    en: "Islam & Atheism",
    channel: "Peace TV",
    channelColor: "#0066CC",
    description: "An intellectual program addressing contemporary atheist and secular challenges to Islam. Dr. Lakhvi presents rational and scriptural responses grounded in Islamic philosophy.",
    videos: [
      { id: "HBbQMQkz3GE", title: "الحاد کا تعارف اور تاریخ", ep: "Episode 1" },
      { id: "S5PkGChDv9U", title: "وجود خدا کے دلائل", ep: "Episode 2" },
      { id: "Xk4uGYkbBFg", title: "قرآن اور جدید سائنس", ep: "Episode 3" },
    ],
  },
  {
    id: "tv5",
    icon: "⚖️",
    name: "حدیث جبرئیل",
    en: "Hadith Jibril",
    channel: "Peace TV",
    channelColor: "#0066CC",
    description: "An in-depth exploration of the famous Hadith Jibril covering the three dimensions of Islam: Iman (faith), Islam (practice), and Ihsan (spiritual excellence).",
    videos: [
      { id: "5RuqA4c_8GQ", title: "حدیث جبرئیل — تعارف", ep: "Episode 1" },
      { id: "yDa1JTOf0xA", title: "ایمان کے ارکان", ep: "Episode 2" },
      { id: "nmBwd3MkPSY", title: "اسلام کے ارکان", ep: "Episode 3" },
      { id: "HBbQMQkz3GE", title: "احسان — اعلی مقام", ep: "Episode 4" },
    ],
  },
  {
    id: "tv6",
    icon: "🌙",
    name: "روشنی",
    en: "Roshni",
    channel: "Lahore News",
    channelColor: "#8B4513",
    description: "A weekly program providing guidance on Islamic values, ethics, and spirituality. Widely watched in Punjab for its accessible and enlightening approach to Islamic teachings.",
    videos: [
      { id: "S5PkGChDv9U", title: "روشنی — ایمان کی کرن", ep: "Episode 1" },
      { id: "Xk4uGYkbBFg", title: "اخلاق اسلامی", ep: "Episode 2" },
      { id: "5RuqA4c_8GQ", title: "صبر اور رضا", ep: "Episode 3" },
    ],
  },
];

// ── NavBar ──────────────────────────────────────────────────────────────────
function NavBar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <>
      <style>{`
        .nav-link{background:none;border:none;cursor:pointer;font-family:'Libre Baskerville',serif;font-size:13px;letter-spacing:0.08em;padding:6px 12px;color:${COLORS.cream};transition:color 0.2s;text-transform:uppercase}
        .nav-link:hover,.nav-link.active{color:${COLORS.goldLight}}
        .nav-link.active{border-bottom:2px solid ${COLORS.goldLight}}
        .hamburger{background:none;border:none;cursor:pointer;display:none;flex-direction:column;gap:5px;padding:4px}
        .hamburger span{display:block;width:24px;height:2px;background:${COLORS.cream};transition:all 0.3s}
        @media(max-width:900px){.nav-desktop{display:none!important}.hamburger{display:flex!important}}
        .mobile-menu{position:fixed;top:64px;left:0;right:0;background:${COLORS.darkGreen};padding:16px;z-index:999;border-bottom:2px solid ${COLORS.gold};display:flex;flex-direction:column;gap:4px}
      `}</style>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(26,58,42,0.97)" : COLORS.darkGreen, boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.3)" : "none", transition: "all 0.3s", borderBottom: "1px solid rgba(184,151,42,0.3)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <button onClick={() => setActive("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <span style={{ fontFamily: "'Amiri',serif", fontSize: 18, color: COLORS.goldLight, letterSpacing: "0.05em", lineHeight: 1.2 }}>Dr. Muhammad Hammad Lakhvi</span>
            <span style={{ fontFamily: "'Libre Baskerville',serif", fontSize: 10, color: COLORS.cream, opacity: 0.7, letterSpacing: "0.15em", textTransform: "uppercase" }}>Islamic Scholar · Professor Emeritus</span>
          </button>
          <div className="nav-desktop" style={{ display: "flex", gap: 2 }}>
            {NAV_ITEMS.map(n => <button key={n.id} className={`nav-link${active === n.id ? " active" : ""}`} onClick={() => setActive(n.id)}>{n.label}</button>)}
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            {NAV_ITEMS.map(n => <button key={n.id} className={`nav-link${active === n.id ? " active" : ""}`} onClick={() => { setActive(n.id); setMenuOpen(false); }} style={{ textAlign: "left" }}>{n.label}</button>)}
          </div>
        )}
      </nav>
    </>
  );
}

// ── Shared components ────────────────────────────────────────────────────────
function ArabicOrnament() {
  return <div style={{ textAlign: "center", color: COLORS.gold, fontSize: 28, opacity: 0.6, letterSpacing: 8, margin: "8px 0" }}>❧ ✦ ❧</div>;
}
// ── Video Modal component ───────────────────────────────────────────────────
function VideoModal({ video, onClose }) {
  if (!video) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.92)", backdropFilter: "blur(10px)", animation: "fadeIn 0.3s ease" }}
      onClick={onClose}>
      <div style={{ position: "relative", width: "90%", maxWidth: 1000, aspectRatio: "16/9", background: "#000", borderRadius: 4, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.8)", border: `1px solid rgba(184,151,42,0.3)` }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 15, right: 15, zIndex: 10, background: "rgba(0,0,0,0.6)", border: "none", color: "#fff", width: 40, height: 40, borderRadius: "50%", cursor: "pointer", fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background = COLORS.gold}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.6)"}>×</button>
        <iframe style={{ width: "100%", height: "100%", border: "none" }}
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
          allow="autoplay; encrypted-media" allowFullScreen title={video.title} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 30px", background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)", color: "#fff" }}>
          <div className="urdu" style={{ fontSize: 20, color: COLORS.goldLight, marginBottom: 4 }}>{video.title}</div>
          <div style={{ fontSize: 13, opacity: 0.8, letterSpacing: "0.05em" }}>{video.ep || "Special Lecture"}</div>
        </div>
      </div>
    </div>
  );
}

// ── WhatsApp Button component ────────────────────────────────────────────────
function WhatsAppButton() {
  const whatsappNumber = "+923079797519"; // Placeholder - common format
  return (
    <a href={`https://wa.me/${whatsappNumber.replace(/\+/g, "")}`} target="_blank" rel="noreferrer"
      style={{ position: "fixed", bottom: 30, right: 30, zIndex: 1100, width: 60, height: 60, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", transition: "all 0.3s", cursor: "pointer", animation: "shimmer 3s infinite" }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1) translateY(-5px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1) translateY(0)"}>
      <svg width="34" height="34" viewBox="0 0 24 24" fill="white">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.316 1.592 5.43 0 9.856-4.426 9.858-9.855.002-5.43-4.425-9.856-9.853-9.856-5.431 0-9.856 4.426-9.858 9.855.001 1.938.549 3.791 1.587 5.399l-.995 3.635 3.745-.969zm11.381-6.83c-.312-.156-1.848-.912-2.134-1.017-.286-.105-.495-.156-.704.156-.21.312-.801 1.017-1.006 1.25-.204.234-.411.261-.724.105-.312-.156-1.32-.486-2.515-1.551-.929-.828-1.555-1.851-1.737-2.163-.182-.312-.019-.481.137-.635.141-.138.312-.365.469-.547.156-.182.209-.312.313-.52.104-.21.052-.39-.026-.547-.078-.156-.704-1.7-.965-2.33-.254-.614-.512-.53-.704-.54-.182-.008-.391-.01-.6-.01s-.547.078-.833.39c-.286.312-1.094 1.068-1.094 2.604s1.12 3.021 1.276 3.23c.156.21 2.204 3.366 5.338 4.72.744.322 1.325.515 1.777.659.746.237 1.425.203 1.962.123.599-.088 1.848-.755 2.108-1.485.26-.73.26-1.354.182-1.485-.078-.13-.286-.208-.598-.364z" />
      </svg>
    </a>
  );
}

function SectionHeader({ title, urdu, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <ArabicOrnament />
      {urdu && <p className="urdu" style={{ fontSize: 22, color: COLORS.green, marginBottom: 4 }}>{urdu}</p>}
      <h2 style={{ fontFamily: "'Amiri',serif", fontSize: "clamp(28px,4vw,42px)", color: COLORS.darkGreen, fontWeight: 700, letterSpacing: "0.02em" }}>{title}</h2>
      {sub && <p style={{ color: COLORS.textLight, fontSize: 14, marginTop: 8, letterSpacing: "0.1em", textTransform: "uppercase" }}>{sub}</p>}
      <div style={{ width: 60, height: 2, background: `linear-gradient(90deg,${COLORS.gold},${COLORS.goldLight})`, margin: "16px auto 0" }} />
    </div>
  );
}
function YouTubeEmbed({ videoId, title }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div style={{ position: "relative", paddingBottom: "56.25%", background: COLORS.charcoal, overflow: "hidden" }}>
      {playing ? (
        <iframe style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }} src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} allow="autoplay; encrypted-media" allowFullScreen title={title} />
      ) : (
        <div onClick={() => setPlaying(true)} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg) center/cover` }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(184,151,42,0.92)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
            <span style={{ fontSize: 22, marginLeft: 4 }}>▶</span>
          </div>
        </div>
      )}
    </div>
  );
}
function BackBtn({ onClick, label = "← Back" }) {
  return (
    <button onClick={onClick} style={{ background: "none", border: `1px solid ${COLORS.border}`, cursor: "pointer", padding: "10px 20px", borderRadius: 2, display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Libre Baskerville',serif", fontSize: 13, color: COLORS.text, marginBottom: 36, transition: "all 0.2s" }}>{label}</button>
  );
}

// ── HomePage ─────────────────────────────────────────────────────────────────
function HomePage({ setActive, onProgramClick }) {
  return (
    <div>
      {/* ── Hero ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: `linear-gradient(160deg,${COLORS.darkGreen} 0%,${COLORS.green} 60%,#1a4a30 100%)`, position: "relative", overflow: "hidden", paddingTop: 64 }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

        <div className="hero-layout" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 56px", width: "100%", display: "flex", alignItems: "center", gap: 72, position: "relative", animation: "fadeUp 0.9s ease" }}>
          {/* Photo */}
          <div style={{ flexShrink: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="hero-pic" style={{ width: 300, height: 370, borderRadius: 16, border: `5px solid ${COLORS.goldLight}`, animation: "glowPulse 3s ease-in-out infinite", overflow: "hidden", background: COLORS.darkGreen, position: "relative" }}>
              <img src="/profile.jpg" alt="Dr. Muhammad Hammad Lakhvi"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:${COLORS.darkGreen}"><div style="font-size:80px">👤</div><div style="font-family:'Noto Nastaliq Urdu',serif;font-size:14px;color:${COLORS.goldLight};margin-top:12px;direction:rtl">پروفیسر ڈاکٹر محمد حماد لکھوی</div></div>`; }}
              />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top,rgba(26,58,42,0.9) 0%,transparent 100%)", padding: "28px 16px 14px", textAlign: "center" }}>
                <div className="urdu" style={{ fontSize: 14, color: COLORS.goldLight }}>حفظہ اللہ</div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="hero-text" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0 }}>
            <div style={{ fontSize: 36, marginBottom: 10, animation: "shimmer 3s infinite" }}>☽</div>
            <div style={{ fontFamily: "'Noto Nastaliq Urdu',serif", fontSize: "clamp(15px,2.2vw,22px)", color: COLORS.goldLight, marginBottom: 16, direction: "rtl", lineHeight: 2, width: "100%", textAlign: "right" }}>
              بسم اللہ الرحمن الرحیم
            </div>
            <h1 style={{ fontFamily: "'Amiri',serif", fontSize: "clamp(30px,4.5vw,62px)", color: COLORS.cream, fontWeight: 700, lineHeight: 1.1, marginBottom: 8, letterSpacing: "0.02em" }}>
              Dr. Muhammad<br />Hammad Lakhvi
            </h1>
            <div className="urdu" style={{ fontSize: "clamp(14px,1.8vw,20px)", color: COLORS.goldLight, marginBottom: 14, lineHeight: 2 }}>
              پروفیسر ڈاکٹر محمد حماد لکھوی حفظہ اللہ
            </div>
            <div style={{ width: 80, height: 2, background: COLORS.gold, marginBottom: 18 }} />

            <p style={{ fontFamily: "'Libre Baskerville',serif", fontSize: "clamp(12px,1.4vw,15px)", color: "rgba(250,246,239,0.85)", marginBottom: 8, lineHeight: 1.8 }}>
              President Faith Foundation, Former Dean & Professor, Institute of Islamic Studies<br />University of the Punjab, Lahore
            </p>
            {/* UPDATED: removed اور جمیعت اہلحدیث from hero designation */}
            <div className="urdu" style={{ fontSize: "clamp(14px,1.5vw,17px)", color: "rgba(250,246,239,0.8)", marginBottom: 22, lineHeight: 2 }}>
                         </div>

            <div className="hero-creds" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
              {["Post-Doc — Glasgow UK", "Ph.D. Islamic Studies", "LLB Law", "MA Islamiyat — Gold Medal"].map(c => (
                <span key={c} style={{ background: "rgba(184,151,42,0.18)", border: `1px solid ${COLORS.gold}`, color: COLORS.goldLight, padding: "5px 13px", borderRadius: 2, fontSize: 11, letterSpacing: "0.04em", fontFamily: "'Libre Baskerville',serif" }}>{c}</span>
              ))}
            </div>

            <div className="hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[["Watch Lectures", "lectures", true], ["Read Articles", "articles", false], ["Biography", "biography", false], ["Contact", "contact", false]].map(([label, id, primary]) => (
                <button key={id} onClick={() => setActive(id)} style={{ background: primary ? `linear-gradient(135deg,${COLORS.gold},${COLORS.goldLight})` : "transparent", border: `2px solid ${COLORS.gold}`, color: primary ? COLORS.darkGreen : COLORS.cream, padding: "12px 26px", fontSize: 13, fontFamily: "'Libre Baskerville',serif", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2, fontWeight: primary ? 700 : 400, transition: "all 0.2s" }}>{label}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: COLORS.darkGreen, padding: "40px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 28, textAlign: "center" }}>
          {[["35+","Years Teaching"],["47+","Research Papers"],["17+","Int'l Conferences"],["10+","TV Programs"],["2009","Masjid Al-Mubarak"],["300+","Family Legacy (Yrs)"]].map(([n,l]) => (
            <div key={l}><div style={{ fontFamily: "'Amiri',serif", fontSize: 38, color: COLORS.goldLight, fontWeight: 700 }}>{n}</div><div style={{ fontSize: 10, color: "rgba(250,246,239,0.7)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>{l}</div></div>
          ))}
        </div>
      </section>

      {/* Featured TV Programs — now clickable */}
      <FeaturedTVPrograms onProgramClick={onProgramClick} />
    </div>
  );
}

// ── FeaturedTVPrograms (used in HomePage) ─────────────────────────────────────
function FeaturedTVPrograms({ onProgramClick }) {
  return (
    <section style={{ padding: "80px 24px", background: COLORS.cream }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader title="Featured TV Programs" urdu="مشہور ٹی وی پروگرامز" sub="Click any program to watch videos" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
          {TV_PROGRAMS_DATA.map((p, i) => (
            <div key={p.id} className="tv-program-card" onClick={() => onProgramClick(p.id)}
              style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, padding: "28px 20px", textAlign: "center", borderRadius: 2, borderTop: `4px solid ${p.channelColor}`, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", animation: `fadeUp 0.5s ease ${i*0.08}s both`, position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: 34, marginBottom: 12 }}>{p.icon}</div>
              <div className="urdu" style={{ fontSize: 16, color: COLORS.darkGreen, fontWeight: 600, marginBottom: 6, lineHeight: 2 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: COLORS.textLight, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>{p.channel}</div>
              <div style={{ fontSize: 11, color: p.channelColor, fontWeight: 700, letterSpacing: "0.08em" }}>WATCH VIDEOS →</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TVProgramDetailPage ────────────────────────────────────────────────────────
function TVProgramDetailPage({ program, onBack, onVideoClick }) {
  if (!program) return null;
  return (
    <div style={{ padding: "80px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <BackBtn onClick={onBack} label="← Back to Programs" />

        {/* Program header */}
        <div style={{ background: `linear-gradient(135deg,${COLORS.darkGreen},${COLORS.green})`, borderRadius: 2, padding: "40px", marginBottom: 40, borderTop: `5px solid ${program.channelColor}` }}>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ fontSize: 56 }}>{program.icon}</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 11, color: "rgba(250,246,239,0.6)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>TV Program · {program.channel}</div>
              <div className="urdu" style={{ fontSize: 28, color: COLORS.goldLight, lineHeight: 1.8, marginBottom: 4 }}>{program.name}</div>
              <div style={{ fontFamily: "'Amiri',serif", fontSize: 20, color: COLORS.cream, marginBottom: 14 }}>{program.en}</div>
              <p style={{ color: "rgba(250,246,239,0.8)", fontSize: 14, lineHeight: 1.8 }}>{program.description}</p>
            </div>
          </div>
        </div>

        {/* Facebook Videos for Payam-e-Subah */}
        {program.facebookVideos && program.facebookVideos.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <h3 style={{ fontFamily: "'Amiri',serif", fontSize: 22, color: COLORS.darkGreen, marginBottom: 20, paddingBottom: 10, borderBottom: `2px solid ${COLORS.border}` }}>
              📺 پیام صبح — دنیا نیوز — Facebook Videos
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20 }}>
              {program.facebookVideos.map((v, i) => (
                <a key={v.year} href={v.url} target="_blank" rel="noreferrer"
                  style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, padding: "28px 24px", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, borderTop: `4px solid #1877F2`, animation: `fadeUp 0.5s ease ${i*0.1}s both`, transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#1877F2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>📘</div>
                  <div className="urdu" style={{ fontSize: 18, color: COLORS.darkGreen, fontWeight: 700, lineHeight: 2 }}>{v.title}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "#1877F2", fontFamily: "'Amiri',serif" }}>{v.year}</div>
                  <div style={{ fontSize: 11, color: COLORS.textLight, letterSpacing: "0.1em", textTransform: "uppercase" }}>{v.label}</div>
                  <div style={{ marginTop: 4, background: "#1877F2", color: COLORS.cream, padding: "7px 20px", borderRadius: 2, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" }}>Watch on Facebook →</div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* YouTube Videos */}
        {program.videos && program.videos.length > 0 && (
          <div>
            <h3 style={{ fontFamily: "'Amiri',serif", fontSize: 22, color: COLORS.darkGreen, marginBottom: 20, paddingBottom: 10, borderBottom: `2px solid ${COLORS.border}` }}>
              🎬 Available Episodes
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 24 }}>
              {program.videos.map((v, i) => (
                <div key={v.id + i} 
                  onClick={() => onVideoClick(v)}
                  style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, overflow: "hidden", animation: `fadeUp 0.5s ease ${i*0.08}s both`, cursor: "pointer", transition: "transform 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                  <div style={{ position: "relative", paddingBottom: "56.25%", background: COLORS.charcoal, overflow: "hidden" }}>
                    <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.2)" }}>
                      <div style={{ width: 50, height: 50, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}>
                        <span style={{ color: "#fff", fontSize: 18, marginLeft: 3 }}>▶</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ background: `${COLORS.gold}22`, color: COLORS.gold, padding: "3px 10px", fontSize: 11, borderRadius: 2, flexShrink: 0 }}>{v.ep}</span>
                    <div className="urdu" style={{ fontSize: 15, color: COLORS.darkGreen, fontWeight: 600 }}>{v.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {program.videos.length === 0 && (!program.facebookVideos || program.facebookVideos.length === 0) && (
          <div style={{ textAlign: "center", padding: "60px", color: COLORS.textLight }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📺</div>
            <p style={{ fontSize: 16 }}>Videos coming soon. Please check the official channels.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── ShortsPage ───────────────────────────────────────────────────────────────
function ShortsPage({ onVideoClick }) {
  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader title="Short Video Clips" urdu="مختصر ویڈیوز" sub="Watch & share short Islamic lectures" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 28 }}>
          {SHORT_CLIPS.map((v, i) => (
            <div key={v.id + i} 
              onClick={() => onVideoClick(v)}
              style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", animation: `fadeUp 0.6s ease ${i * 0.08}s both`, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ position: "relative", paddingBottom: "56.25%", background: COLORS.charcoal, overflow: "hidden" }}>
                <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.2)" }}>
                  <div style={{ width: 50, height: 50, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontSize: 18, marginLeft: 3 }}>▶</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: "16px 20px" }}>
                <div className="urdu" style={{ fontSize: 16, color: COLORS.darkGreen, fontWeight: 600, marginBottom: 4 }}>{v.title}</div>
                <div style={{ fontSize: 12, color: COLORS.textLight }}>{v.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── LecturesPage ─────────────────────────────────────────────────────────────
function LecturesPage({ onVideoClick }) {
  const [tab, setTab] = useState("series");
  const [activeSeries, setActiveSeries] = useState(null);
  const tabs = [{ id: "series", label: "Series" }, { id: "quran", label: "Quran" }, { id: "tafseer", label: "Tafseer" }, { id: "hadeeth", label: "Hadeeth" }, { id: "full", label: "Full Lectures" }];

  if (activeSeries) {
    const s = LECTURE_SERIES.find(x => x.id === activeSeries);
    return (
      <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <BackBtn onClick={() => setActiveSeries(null)} label="← Back to Series" />
          <div style={{ background: `linear-gradient(135deg,${COLORS.darkGreen},${COLORS.green})`, borderRadius: 2, overflow: "hidden", marginBottom: 40, display: "flex", flexWrap: "wrap" }}>
            <div style={{ width: 280, minHeight: 180, flexShrink: 0, background: COLORS.darkGreen, position: "relative", overflow: "hidden" }}>
              <img src={s.thumbnail} alt={s.title} style={{ width: "100%", height: "100%", minHeight: 180, objectFit: "cover", display: "block" }}
                onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = `<div style="width:100%;min-height:180px;display:flex;align-items:center;justify-content:center;font-size:60px">📚</div>`; }} />
            </div>
            <div style={{ flex: 1, padding: "32px 36px", minWidth: 200 }}>
              <div style={{ fontSize: 11, color: COLORS.gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>{s.channel}</div>
              <div className="urdu" style={{ fontSize: 26, color: COLORS.goldLight, lineHeight: 1.8, marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontFamily: "'Amiri',serif", fontSize: 20, color: COLORS.cream, marginBottom: 12 }}>{s.en}</div>
              <p style={{ color: "rgba(250,246,239,0.75)", fontSize: 13, lineHeight: 1.8, marginBottom: 16 }}>{s.description}</p>
              <span style={{ background: "rgba(184,151,42,0.2)", border: `1px solid ${COLORS.gold}`, color: COLORS.goldLight, padding: "4px 14px", fontSize: 12, borderRadius: 2 }}>{s.count} Episodes</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 24 }}>
            {s.videos.map((v, i) => (
              <div key={v.id + i} 
                onClick={() => onVideoClick(v)}
                style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, overflow: "hidden", animation: `fadeUp 0.5s ease ${i * 0.07}s both`, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                <div style={{ position: "relative", paddingBottom: "56.25%", background: COLORS.charcoal, overflow: "hidden" }}>
                  <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.2)" }}>
                    <div style={{ width: 50, height: 50, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: "#fff", fontSize: 18, marginLeft: 3 }}>▶</span>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ background: `${COLORS.gold}22`, color: COLORS.gold, padding: "3px 10px", fontSize: 11, borderRadius: 2, flexShrink: 0 }}>{v.ep}</span>
                  <div className="urdu" style={{ fontSize: 15, color: COLORS.darkGreen, fontWeight: 600 }}>{v.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader title="Lectures & Durus" urdu="دروس و خطبات" sub="Quran · Tafseer · Hadeeth · Series" />
        <div style={{ display: "flex", gap: 0, marginBottom: 40, borderBottom: `2px solid ${COLORS.border}`, flexWrap: "wrap" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 26px", fontFamily: "'Libre Baskerville',serif", fontSize: 14, letterSpacing: "0.05em", color: tab === t.id ? COLORS.green : COLORS.textLight, borderBottom: tab === t.id ? `3px solid ${COLORS.gold}` : "3px solid transparent", fontWeight: tab === t.id ? 700 : 400, marginBottom: -2, transition: "all 0.2s" }}>{t.label}</button>
          ))}
        </div>
        {tab === "series" && (
          <div>
            <p style={{ color: COLORS.textLight, fontSize: 14, marginBottom: 32, lineHeight: 1.7 }}>Click on any series card to watch all episodes in that collection.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 28 }}>
              {LECTURE_SERIES.map((s, i) => (
                <div key={s.id} className="series-card" onClick={() => setActiveSeries(s.id)}
                  style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", animation: `fadeUp 0.5s ease ${i * 0.1}s both` }}>
                  <div style={{ position: "relative", height: 185, background: COLORS.darkGreen, overflow: "hidden" }}>
                    <img src={s.thumbnail} alt={s.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = `<div style="width:100%;height:185px;display:flex;align-items:center;justify-content:center;background:${COLORS.darkGreen};font-size:56px">📚</div>`; }} />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.32)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(184,151,42,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 20, marginLeft: 3 }}>▶</span>
                      </div>
                    </div>
                    <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(26,58,42,0.9)", color: COLORS.goldLight, padding: "3px 10px", fontSize: 11, borderRadius: 2, border: `1px solid ${COLORS.gold}` }}>{s.count} Episodes</div>
                    <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(26,58,42,0.9)", color: "rgba(250,246,239,0.8)", padding: "3px 10px", fontSize: 10, borderRadius: 2, letterSpacing: "0.06em" }}>{s.channel}</div>
                  </div>
                  <div style={{ padding: "18px 20px 20px" }}>
                    <div className="urdu" style={{ fontSize: 18, color: COLORS.darkGreen, fontWeight: 700, lineHeight: 1.8, marginBottom: 2 }}>{s.title}</div>
                    <div style={{ fontFamily: "'Amiri',serif", fontSize: 14, color: COLORS.green, marginBottom: 10 }}>{s.en}</div>
                    <p style={{ fontSize: 12, color: COLORS.textLight, lineHeight: 1.7, marginBottom: 14 }}>{s.description.slice(0, 95)}…</p>
                    <div style={{ color: COLORS.gold, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" }}>VIEW ALL EPISODES →</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === "full" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(360px,1fr))", gap: 28 }}>
            {LONG_VIDEOS.map((v, i) => (
              <div key={v.id + i} 
                onClick={() => onVideoClick(v)}
                style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, overflow: "hidden", animation: `fadeUp 0.5s ease ${i * 0.1}s both`, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                <div style={{ position: "relative", paddingBottom: "56.25%", background: COLORS.charcoal, overflow: "hidden" }}>
                  <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.2)" }}>
                    <div style={{ width: 50, height: 50, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: "#fff", fontSize: 18, marginLeft: 3 }}>▶</span>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "20px" }}>
                  <div className="urdu" style={{ fontSize: 17, color: COLORS.darkGreen, fontWeight: 600, marginBottom: 6 }}>{v.title}</div>
                  <div style={{ fontSize: 12, color: COLORS.textLight, marginBottom: 8 }}>{v.subtitle}</div>
                  <span style={{ background: `${COLORS.gold}22`, color: COLORS.gold, padding: "2px 10px", fontSize: 11, borderRadius: 2 }}>⏱ {v.duration}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab !== "series" && tab !== "full" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 24 }}>
            {SHORT_CLIPS.map((v, i) => (
              <div key={v.id + tab + i} 
                onClick={() => onVideoClick(v)}
                style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, overflow: "hidden", animation: `fadeUp 0.5s ease ${i * 0.08}s both`, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                <div style={{ position: "relative", paddingBottom: "56.25%", background: COLORS.charcoal, overflow: "hidden" }}>
                  <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.2)" }}>
                    <div style={{ width: 50, height: 50, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: "#fff", fontSize: 18, marginLeft: 3 }}>▶</span>
                    </div>
                  </div>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <div className="urdu" style={{ fontSize: 15, color: COLORS.darkGreen, fontWeight: 600, marginBottom: 4 }}>{v.title}</div>
                  <div style={{ fontSize: 12, color: COLORS.textLight, textTransform: "capitalize" }}>{tab} Lecture</div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: 48, textAlign: "center", padding: "40px", background: COLORS.darkGreen, borderRadius: 2 }}>
          <div style={{ fontFamily: "'Amiri',serif", fontSize: 24, color: COLORS.goldLight, marginBottom: 8 }}>Watch All Lectures on YouTube</div>
          <p style={{ color: "rgba(250,246,239,0.7)", marginBottom: 20, fontSize: 14 }}>Subscribe to the official channel for weekly Tafseer durus and more</p>
          {/* UPDATED YouTube channel URL */}
          <a href="https://youtube.com/@profdrmuhammadhammadlakhvi" target="_blank" rel="noreferrer" style={{ display: "inline-block", background: COLORS.gold, color: COLORS.darkGreen, padding: "12px 32px", textDecoration: "none", fontWeight: 700, fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 2 }}>🎬 YouTube Channel →</a>
        </div>
      </div>
    </div>
  );
}

// ── ArticleDetailPage ─────────────────────────────────────────────────────────
function ArticleDetailPage({ article, onBack }) {
  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <BackBtn onClick={onBack} label="← Back to Articles" />
        <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <div style={{ background: `linear-gradient(135deg,${COLORS.darkGreen},${COLORS.green})`, padding: "40px" }}>
            <span style={{ background: "rgba(184,151,42,0.3)", color: COLORS.goldLight, padding: "4px 14px", fontSize: 11, borderRadius: 2, letterSpacing: "0.1em", textTransform: "uppercase", display: "inline-block", marginBottom: 16 }}>{article.category}</span>
            <div className={article.lang === "urdu" ? "urdu" : ""} style={{ fontSize: article.lang === "urdu" ? 24 : 22, color: COLORS.cream, fontFamily: article.lang === "urdu" ? "'Noto Nastaliq Urdu',serif" : "'Amiri',serif", fontWeight: 700, lineHeight: article.lang === "urdu" ? 2 : 1.35, marginBottom: 20 }}>
              {article.title}
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <span style={{ color: "rgba(250,246,239,0.7)", fontSize: 13 }}>📰 {article.journal}</span>
              <span style={{ color: COLORS.goldLight, fontSize: 13 }}>📅 {article.year}</span>
              {article.pages && <span style={{ color: "rgba(250,246,239,0.7)", fontSize: 13 }}>📄 pp. {article.pages}</span>}
            </div>
          </div>
          <div style={{ padding: "40px" }}>
            <h3 style={{ fontFamily: "'Amiri',serif", fontSize: 18, color: COLORS.darkGreen, marginBottom: 14 }}>Abstract</h3>
            <div style={{ background: `${COLORS.gold}08`, border: `1px solid ${COLORS.gold}33`, borderLeft: `4px solid ${COLORS.gold}`, padding: "20px 24px", borderRadius: 2, marginBottom: 32 }}>
              <p className={article.lang === "urdu" ? "urdu" : ""} style={{ fontSize: article.lang === "urdu" ? 16 : 14, lineHeight: article.lang === "urdu" ? 2.4 : 1.9, color: COLORS.text }}>
                {article.abstract}
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 32 }}>
              {[
                { label: "Author", value: "Prof. Dr. Muhammad Hammad Lakhvi" },
                { label: "Published In", value: article.journal },
                { label: "Year", value: article.year },
                { label: "Language", value: article.lang === "urdu" ? "Urdu" : "English" },
                ...(article.pages ? [{ label: "Pages", value: article.pages }] : []),
                { label: "Category", value: article.category },
              ].map(row => (
                <div key={row.label} style={{ background: COLORS.cream, padding: "14px 18px", borderRadius: 2 }}>
                  <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: COLORS.textLight, marginBottom: 4 }}>{row.label}</div>
                  <div style={{ fontSize: 13, color: COLORS.text, fontWeight: 600 }}>{row.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: `${COLORS.green}11`, border: `1px solid ${COLORS.green}44`, borderRadius: 2, padding: "18px 24px", textAlign: "center" }}>
              <p style={{ color: COLORS.green, fontSize: 13, lineHeight: 1.7 }}>For full-text access, please contact the respective journal or the author via the Contact page.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ArticlesPage ──────────────────────────────────────────────────────────────
function ArticlesPage() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const filtered = filter === "all" ? ARTICLES : ARTICLES.filter(a => a.lang === filter);
  if (selected) return <ArticleDetailPage article={selected} onBack={() => setSelected(null)} />;
  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionHeader title="Research Articles" urdu="علمی مقالات" sub="Click any article to read details" />
        <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
          {[["all","All"],["en","English"],["urdu","اردو"]].map(([v,l]) => (
            <button key={v} onClick={() => setFilter(v)} style={{ background: filter === v ? COLORS.green : "transparent", border: `1px solid ${filter === v ? COLORS.green : COLORS.border}`, color: filter === v ? COLORS.cream : COLORS.text, padding: "8px 20px", fontSize: 13, cursor: "pointer", borderRadius: 2, fontFamily: "'Libre Baskerville',serif", transition: "all 0.2s" }}>{l}</button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.map((a, i) => (
            <div key={i} className="article-card" onClick={() => setSelected(a)}
              style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, borderLeft: `4px solid ${COLORS.gold}`, animation: `slideIn 0.4s ease ${i * 0.04}s both`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ flex: 1 }}>
                <div className={a.lang === "urdu" ? "urdu" : ""} style={{ fontSize: a.lang === "urdu" ? 16 : 15, color: COLORS.darkGreen, fontWeight: 600, marginBottom: 4 }}>{a.title}</div>
                <div style={{ fontSize: 12, color: COLORS.textLight, marginBottom: 5 }}>{a.journal}</div>
                <span style={{ background: `${COLORS.green}15`, color: COLORS.green, padding: "2px 8px", fontSize: 10, borderRadius: 2, letterSpacing: "0.08em" }}>{a.category}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                <span style={{ background: `${COLORS.gold}22`, color: COLORS.gold, padding: "4px 12px", fontSize: 12, borderRadius: 2 }}>{a.year}</span>
                <span style={{ fontSize: 11, color: COLORS.gold, fontWeight: 600 }}>Read More →</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32, padding: "18px 24px", background: `${COLORS.green}11`, border: `1px solid ${COLORS.green}44`, borderRadius: 2, textAlign: "center" }}>
          <p style={{ color: COLORS.green, fontSize: 14 }}>Full bibliography available upon request · <strong>47+ publications</strong> in national and international journals</p>
        </div>
      </div>
    </div>
  );
}

// ── FatwaPage ─────────────────────────────────────────────────────────────────
function FatwaPage() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader title="Q&A / Fatwas" urdu="سوال و جواب / فتاوی" sub="Islamic Jurisprudence & Guidance" />
        <div style={{ background: `${COLORS.gold}11`, border: `1px solid ${COLORS.gold}44`, padding: "16px 24px", borderRadius: 2, marginBottom: 32 }}>
          <p style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.7 }}><strong>Note:</strong> Responses here are brief summaries. For comprehensive fatawa, please watch the full recorded sessions or contact us.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FATWAS.map((f, i) => (
            <div key={i} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, overflow: "hidden" }}>
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, textAlign: "left", fontFamily: "'Libre Baskerville',serif" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ color: COLORS.gold, fontSize: 20, flexShrink: 0 }}>❓</span>
                  <span style={{ fontSize: 15, color: COLORS.darkGreen, fontWeight: 600 }}>{f.q}</span>
                </div>
                <span style={{ color: COLORS.gold, fontSize: 20, flexShrink: 0 }}>{openIdx === i ? "▲" : "▼"}</span>
              </button>
              {openIdx === i && (
                <div style={{ padding: "16px 24px 20px 56px", borderTop: `1px solid ${COLORS.border}` }}>
                  <p style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.8 }}>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, padding: "32px", background: COLORS.darkGreen, borderRadius: 2, textAlign: "center" }}>
          <div style={{ fontFamily: "'Amiri',serif", fontSize: 22, color: COLORS.goldLight, marginBottom: 8 }}>Submit Your Question</div>
          <p style={{ color: "rgba(250,246,239,0.7)", fontSize: 13, marginBottom: 20 }}>For personal Islamic guidance and fatawa, reach out via the contact form</p>
          <button style={{ background: COLORS.gold, color: COLORS.darkGreen, border: "none", padding: "12px 32px", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2 }}>Ask a Question →</button>
        </div>
      </div>
    </div>
  );
}

// ── EventDetailPage ───────────────────────────────────────────────────────────
function EventDetailPage({ event, onBack }) {
  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <BackBtn onClick={onBack} label="← Back to Events" />

        {/* Event Header */}
        <div style={{ background: `linear-gradient(135deg,${COLORS.darkGreen},${COLORS.green})`, borderRadius: 2, padding: "48px 40px", marginBottom: 36, borderLeft: `6px solid ${event.color}`, animation: "fadeUp 0.5s ease" }}>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ fontSize: 56, flexShrink: 0 }}>{event.icon}</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
                <span style={{ background: "rgba(184,151,42,0.25)", border: `1px solid ${COLORS.gold}`, color: COLORS.goldLight, padding: "4px 14px", fontSize: 11, borderRadius: 2, letterSpacing: "0.1em" }}>{event.type}</span>
                {event.recurring && <span style={{ background: "rgba(255,255,255,0.1)", color: "rgba(250,246,239,0.7)", padding: "4px 14px", fontSize: 11, borderRadius: 2, border: "1px solid rgba(255,255,255,0.2)" }}>🔄 Recurring</span>}
              </div>
              <h2 style={{ fontFamily: "'Amiri',serif", fontSize: "clamp(20px,3vw,30px)", color: COLORS.cream, fontWeight: 700, lineHeight: 1.3, marginBottom: 12 }}>{event.title}</h2>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 16 }}>
                <span style={{ color: COLORS.goldLight, fontSize: 14 }}>📅 {event.date}</span>
                <span style={{ color: "rgba(250,246,239,0.7)", fontSize: 14 }}>📍 {event.location}</span>
              </div>
              <p style={{ color: "rgba(250,246,239,0.85)", fontSize: 14, lineHeight: 1.9 }}>{event.description}</p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 36 }}>
          <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, padding: "28px", gridColumn: "1 / -1" }}>
            <h3 style={{ fontFamily: "'Amiri',serif", fontSize: 20, color: COLORS.darkGreen, marginBottom: 18 }}>Event Details</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {event.details.map((d, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 16px", background: COLORS.cream, borderRadius: 2, borderLeft: `3px solid ${event.color}` }}>
                  <span style={{ color: COLORS.gold, fontSize: 16, flexShrink: 0 }}>✦</span>
                  <span style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.6 }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image Gallery Placeholder */}
        <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, padding: "36px", textAlign: "center", marginBottom: 24 }}>
          <h3 style={{ fontFamily: "'Amiri',serif", fontSize: 20, color: COLORS.darkGreen, marginBottom: 12 }}>Event Gallery</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16, marginTop: 20 }}>
            {[1,2,3].map(n => (
              <div key={n} style={{ height: 160, background: `${COLORS.darkGreen}15`, borderRadius: 2, border: `2px dashed ${COLORS.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <span style={{ fontSize: 36 }}>🖼️</span>
                <span style={{ fontSize: 11, color: COLORS.textLight, letterSpacing: "0.1em" }}>Photo {n}</span>
              </div>
            ))}
          </div>
          <p style={{ color: COLORS.textLight, fontSize: 13, marginTop: 16 }}>Event photos will be added after the event. Check back for updates.</p>
        </div>

        {/* CTA */}
        <div style={{ background: `linear-gradient(135deg,${COLORS.darkGreen},${COLORS.green})`, padding: "32px", borderRadius: 2, textAlign: "center" }}>
          <div style={{ fontFamily: "'Amiri',serif", fontSize: 22, color: COLORS.goldLight, marginBottom: 8 }}>Stay Updated</div>
          <p style={{ color: "rgba(250,246,239,0.7)", fontSize: 13, marginBottom: 20 }}>Follow our channels for event announcements and live coverage</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://youtube.com/@profdrmuhammadhammadlakhvi" target="_blank" rel="noreferrer" style={{ background: "#FF0000", color: COLORS.cream, padding: "10px 24px", textDecoration: "none", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 2 }}>📺 YouTube</a>
            <a href="https://www.facebook.com/share/1GUoLS5Qvu/" target="_blank" rel="noreferrer" style={{ background: "#1877F2", color: COLORS.cream, padding: "10px 24px", textDecoration: "none", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 2 }}>📘 Facebook</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── EventsPage ────────────────────────────────────────────────────────────────
function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (selectedEvent) {
    return <EventDetailPage event={selectedEvent} onBack={() => setSelectedEvent(null)} />;
  }

  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader title="Events & Programs" urdu="تقریبات و پروگرامز" sub="Click any event to view full details, photos & info" />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {EVENTS_DATA.map((e, i) => (
            <div key={e.id} className="event-card" onClick={() => setSelectedEvent(e)}
              style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, padding: "24px 28px", display: "flex", gap: 20, alignItems: "flex-start", borderRadius: 2, animation: `fadeUp 0.5s ease ${i * 0.1}s both`, borderLeft: `5px solid ${e.color}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", cursor: "pointer" }}>
              {/* Icon */}
              <div style={{ fontSize: 36, flexShrink: 0 }}>{e.icon}</div>
              {/* Main content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ background: e.recurring ? `${COLORS.gold}22` : `${COLORS.green}22`, color: e.recurring ? COLORS.gold : COLORS.green, padding: "2px 10px", fontSize: 11, borderRadius: 2, fontWeight: 600 }}>{e.recurring ? "🔄 Recurring" : "📌 One-Time"}</span>
                  <span style={{ background: `${COLORS.darkGreen}11`, color: COLORS.darkGreen, padding: "2px 10px", fontSize: 11, borderRadius: 2 }}>{e.type}</span>
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.darkGreen, marginBottom: 6, lineHeight: 1.4 }}>{e.title}</div>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, color: COLORS.textLight }}>📅 {e.date}</span>
                  <span style={{ fontSize: 13, color: COLORS.textLight }}>📍 {e.location}</span>
                </div>
              </div>
              {/* Arrow */}
              <div style={{ flexShrink: 0, color: COLORS.gold, fontSize: 20, alignSelf: "center" }}>→</div>
            </div>
          ))}
        </div>

        {/* Masjid highlight */}
        <div style={{ marginTop: 40, background: `linear-gradient(135deg,${COLORS.darkGreen},${COLORS.green})`, padding: "36px", borderRadius: 2, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🕌</div>
          <div style={{ fontFamily: "'Amiri',serif", fontSize: 24, color: COLORS.goldLight, marginBottom: 8 }}>Friday Khutbah</div>
          <div className="urdu" style={{ fontSize: 18, color: "rgba(250,246,239,0.85)", marginBottom: 8 }}>مسجد المبارک لاہور</div>
          <p style={{ color: "rgba(250,246,239,0.7)", fontSize: 13 }}>Every Friday · Masjid Al-Mubarak, Lahore (Since 2009)</p>
        </div>
      </div>
    </div>
  );
}

// ── CommunityPage ─────────────────────────────────────────────────────────────
function CommunityPage({ onProgramClick }) {
  // Global navigation handled in App

  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionHeader title="Community" urdu="برادری" sub="Connect · Learn · Grow together in faith" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 24, marginBottom: 48 }}>
          {[
            { icon: "📺", title: "Pegham TV", desc: "Official Islamic education channel. Weekly Tafseer Al-Quran broadcasts.", color: COLORS.green, href: null },
            // UPDATED YouTube channel
            { icon: "🎥", title: "YouTube Channel", desc: "Full lectures, short clips, and live programs available on demand.", color: "#FF0000", href: "https://youtube.com/@profdrmuhammadhammadlakhvi" },
            { icon: "💬", title: "WhatsApp Community", desc: "Daily Islamic reminders, announcements, and Q&A updates.", color: "#25D366", href: null },
            { icon: "📘", title: "Facebook Page", desc: "Connect with thousands of followers and share Islamic knowledge.", color: "#1877F2", href: null },
            { icon: "🏛️", title: "Faith Welfare Foundation", desc: "Social and educational welfare initiatives in Pakistan (Est. 2024).", color: COLORS.gold, href: null },
            { icon: "📧", title: "Newsletter", desc: "Receive new lectures, articles, and event announcements by email.", color: COLORS.darkGreen, href: null },
          ].map((c, i) => (
            <div key={c.title} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, padding: "28px 24px", borderRadius: 2, textAlign: "center", animation: `fadeUp 0.5s ease ${i * 0.08}s both`, borderTop: `4px solid ${c.color}` }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>{c.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.darkGreen, marginBottom: 8 }}>{c.title}</div>
              <p style={{ fontSize: 13, color: COLORS.textLight, lineHeight: 1.6, marginBottom: 16 }}>{c.desc}</p>
              {c.href ? (
                <a href={c.href} target="_blank" rel="noreferrer" style={{ display: "inline-block", background: c.color, color: COLORS.cream, padding: "8px 20px", fontSize: 12, textDecoration: "none", borderRadius: 2, fontWeight: 600 }}>Subscribe →</a>
              ) : (
                <button style={{ background: c.color, color: COLORS.cream, border: "none", padding: "8px 20px", fontSize: 12, cursor: "pointer", borderRadius: 2, fontWeight: 600 }}>Join →</button>
              )}
            </div>
          ))}
        </div>

        {/* Payam al Subah Section — Facebook Videos */}
        <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, padding: "36px", marginBottom: 36 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24, flexWrap: "wrap" }}>
            <div style={{ fontSize: 40 }}>🌅</div>
            <div>
              <div className="urdu" style={{ fontSize: 22, color: COLORS.darkGreen, fontWeight: 700, lineHeight: 2 }}>پیام صبح — دنیا نیوز</div>
              <div style={{ fontSize: 14, color: COLORS.textLight, letterSpacing: "0.05em" }}>Payam al Subah · Dunya News · Annual Programs</div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: COLORS.textLight, lineHeight: 1.8, marginBottom: 24 }}>
            Dr. Lakhvi's annual Payam al Subah morning programs on Dunya News — a beloved tradition of Islamic guidance to start the day. Watch recordings from 2019 to 2022.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16 }}>
            {[
              { year: "2019", url: "https://www.facebook.com/share/1GUoLS5Qvu/", emoji: "🌄" },
              { year: "2020", url: "https://www.facebook.com/share/p/1AwA1ZwbMo/", emoji: "🌅" },
              { year: "2021", url: "https://www.facebook.com/share/1C6XUADaac/", emoji: "☀️" },
              { year: "2022", url: "https://www.facebook.com/share/p/1DVhDGJz8U/", emoji: "🌞" },
            ].map((v, i) => (
              <a key={v.year} href={v.url} target="_blank" rel="noreferrer"
                style={{ background: `linear-gradient(135deg,${COLORS.darkGreen},${COLORS.green})`, border: `1px solid ${COLORS.gold}33`, padding: "24px 16px", borderRadius: 2, textDecoration: "none", textAlign: "center", display: "flex", flexDirection: "column", gap: 8, alignItems: "center", animation: `fadeUp 0.5s ease ${i*0.1}s both`, transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(0,0,0,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: 32 }}>{v.emoji}</div>
                <div style={{ fontFamily: "'Amiri',serif", fontSize: 28, color: COLORS.goldLight, fontWeight: 700 }}>{v.year}</div>
                <div className="urdu" style={{ fontSize: 13, color: "rgba(250,246,239,0.8)", lineHeight: 2 }}>پیام صبح</div>
                <div style={{ background: "#1877F2", color: COLORS.cream, padding: "6px 16px", borderRadius: 2, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", marginTop: 4 }}>📘 Watch →</div>
              </a>
            ))}
          </div>
        </div>

        {/* TV Programs Section */}
        <div style={{ marginBottom: 36 }}>
          <h3 style={{ fontFamily: "'Amiri',serif", fontSize: 22, color: COLORS.darkGreen, marginBottom: 20, paddingBottom: 10, borderBottom: `2px solid ${COLORS.border}` }}>
            📺 TV Programs — Watch Videos
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 18 }}>
            {TV_PROGRAMS_DATA.map((p, i) => (
              <div key={p.id} className="tv-program-card" onClick={() => onProgramClick(p.id)}
                style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, padding: "22px 20px", borderRadius: 2, borderTop: `3px solid ${p.channelColor}`, cursor: "pointer", animation: `fadeUp 0.5s ease ${i*0.07}s both` }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 28 }}>{p.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div className="urdu" style={{ fontSize: 16, color: COLORS.darkGreen, fontWeight: 700, lineHeight: 2 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: COLORS.textLight, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{p.channel}</div>
                    <div style={{ color: p.channelColor, fontSize: 12, fontWeight: 700 }}>Watch Videos →</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jamiat block */}
        <div style={{ background: COLORS.darkGreen, padding: "40px", borderRadius: 2, display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div className="urdu" style={{ fontSize: 22, color: COLORS.goldLight, marginBottom: 8 }}>مرکزی جمیعت اہلحدیث پاکستان</div>
            <div style={{ fontSize: 16, color: COLORS.cream, fontWeight: 600, marginBottom: 8 }}>Markazi Jamiat Ahlul Hadith Pakistan</div>
            <p style={{ fontSize: 13, color: "rgba(250,246,239,0.7)", lineHeight: 1.7 }}>Dr. Lakhvi serves as Deputy Amir (نائب امیر) of the central Islamic organization, providing religious and jurisprudential guidance nationally.</p>
          </div>
          <a href="https://jaup.org" target="_blank" rel="noreferrer" style={{ background: COLORS.gold, color: COLORS.darkGreen, padding: "12px 28px", textDecoration: "none", fontWeight: 700, fontSize: 13, borderRadius: 2, flexShrink: 0 }}>Official Website →</a>
        </div>
      </div>
    </div>
  );
}

// ── BiographyPage — FULL UPDATED VERSION ──────────────────────────────────────
function BiographyPage() {
  const sections = [
    {
      title: "نام و نسب",
      icon: "🌳",
      en: "Lineage & Family",
      urduContent: `محمد حماد بن محی الدین بن محمد علی بن محی الدین عبد الرحمن بن محمد بن بارک اللہ بن محمد امین۔

سلسلہ نسب کے اعتبار سے علوی ہیں — حضرت علی ؓ کی غیر فاطمی اولاد حضرت امام محمد بن حنفیہ کے توسط سے آپ کا شجرہ نسب حضرت علیؓ سے جا ملتا ہے۔`,
      enContent: "Lineage of Dr. Lakhvi traces to Hazrat Ali (RA) through Imam Muhammad ibn Hanafiyyah — he is of the Alawi family from the non-Fatimi branch.",
    },
    {
      title: "پیدائش و جائے پیدائش",
      icon: "📍",
      en: "Birth",
      urduContent: `ڈاکٹر محمد حماد لکھوی 9 دسمبر 1965 دیپالپور کے نواح میں واقع ایک گاؤں قلعہ تارا سنگھ میں پیدا ہوئے۔`,
      enContent: "Born 9 December 1965 in Qila Tara Singh, near Dipalpur, Punjab, Pakistan.",
    },
    {
      title: "خاندانی پس منظر",
      icon: "🏡",
      en: "Family Background",
      urduContent: `برصغیر پاک و ہند کا معروف خاندان لکھوی — دین کی اشاعت و تبلیغ میں ان کا ایک طویل سفر ہے جو 300 سال سے زیادہ کے عرصے پر محیط ہے۔

آپ کے آباؤ اجداد میں سے حافظ محمد بن بارک اللہ لکھوی میاں نذیر حسین دہلوی کے شاگرد تھے جنہوں نے پنجابی نظم کی صورت میں 30 سے زیادہ کتابیں لکھیں جن میں سے نہایت مشہور "احوال الآخرۃ" اور قرآن کی تفسیر "تفسیر محمدی" ہے۔ ابواب الصرف کے نام سے سب سے پہلی کتاب لکھنے کا اعزاز بھی حافظ محمد بن بارک اللہ لکھوی کو حاصل ہے۔

مرزا قادیانی کو فاسق و کاذب قرار دینے کی اولیت میں لکھوی بزرگ بھی شامل ہیں۔ مرزا کے بارے میں مولانا محی الدین عبد الرحمن آپ کے پڑدادا کا اولین فتوی "ان فرعون و ہامان و جنودہما کانوا خاطئین" کا مفصل تذکرہ مولانا اسحاق بھٹی صاحب کی کتاب "تذکرہ مولانا محی الدین لکھوی" میں بھی ملتا ہے۔

مرزا غلام احمد قادیانی نے جواب میں آپ کے پڑدادا کے گھر کے بارے میں جھوٹی پیشگوئی کی — مگر اللہ کے فضل سے وہ پیشگوئی ان کی زندگی میں ہی جھوٹی ثابت ہوئی اور آج ڈاکٹر محمد حماد لکھوی سمیت پڑدادا کی اتنی اولاد موجود ہے ماشاء اللہ جو شاید گننا مشکل ہو جائے — یہ امر واقع مرزا کے جھوٹے ہونے کی واقعاتی دلیل ہے۔

آپ کے پڑدادا محی الدین بن عبد الرحمن جنت بقیع میں مدفون ہیں۔ آپ کے دادا مسجد نبوی میں حدیث کے استاد تھے۔ آپ کے والد محی الدین لکھوی ایک عالم دین ہونے کے ساتھ ساتھ پاکستان کی پہلی اسمبلی میں منتخب ہوئے۔ آپ کے چچا — جو کہ آپ کے سسر بھی ہیں — اہل حدیث جماعت کے سربراہ تھے اور کئی بار پاکستان کی پارلیمنٹ میں منتخب ہوئے اور انہوں نے جنرل ضیاء الحق کی صدارت اور تحریک پاکستان میں نمایاں کردار ادا کیا۔`,
      enContent: "The Lakhvi family has served Islam for over 300 years. Ancestors include students of Mian Nazeer Hussain Dehlawi, early refuters of Mirza Qadiani, and a grandfather who taught Hadith in Masjid Nabawi. Father elected to Pakistan's first assembly. Uncle/father-in-law was head of Ahlul Hadith party and elected multiple times to Parliament.",
    },
    {
      title: "تعلیمی مراحل",
      icon: "🎓",
      en: "Education",
      urduContent: `آپ نے ناظرہ قرآن الٰہ آباد کی جامع مسجد سے پڑھا۔ سکول کی ابتدائی تعلیم اپنے گاؤں سے حاصل کی۔

• میٹرک — دیپالپور ہائی سکول — 1982
• ایف ایس سی — گورنمنٹ کالج دیپالپور — 1984
• بی اے — پنجاب یونیورسٹی — 1986
• ایم اے اسلامیات — پنجاب یونیورسٹی — 1988 (پہلی پوزیشن اور گولڈ میڈل)
• ایم اے عربی — پنجاب یونیورسٹی — 1990 (فرسٹ ڈویژن)
• پی ایچ ڈی — 2001 (موضوع: حریت فرد کا اسلامی تصور)
• ایل ایل بی — پنجاب یونیورسٹی لاء کالج — 2008
• پوسٹ ڈاکٹریٹ — یونیورسٹی آف گلاسگو، اسکاٹ لینڈ، برطانیہ — 2007 (حکومت پاکستان اسکالرشپ)`,
      enContent: "Matric 1982, FSc 1984, BA 1986, MA Islamiyat 1st Position & Gold Medal 1988, MA Arabic 1990, Ph.D. 2001 (Individual Freedom in Islam), LLB 2008, Post-Doctorate University of Glasgow UK 2007 (Government of Pakistan scholarship).",
    },
    {
      title: "الاجازہ فی الحدیث",
      icon: "📜",
      en: "Ijazah in Hadith",
      urduContent: `میٹرک کے بعد کچھ عرصہ جامعہ ابی بکر کراچی میں زیر تعلیم رہے۔ جامعہ محمدیہ اوکاڑہ میں بطور ناظم دفتر خدمات انجام دیتے رہے — اسی دوران درس نظامی کی کتب کا مطالعہ بھی کیا۔

شیخ الحدیث مولانا عبد الحلیم سے جزوی طور پر حدیث کی کتابیں پڑھیں۔ اختتام بخاری کے موقع پر شیخ الجامعہ نے آپ کو سند اور (الاجازہ فی الحدیث) مرحمت فرمائی۔`,
      enContent: "Received formal Ijazah in Hadith from Sheikh al-Hadith Maulana Abdul Haleem upon the completion of Sahih al-Bukhari.",
    },
    {
      title: "تدریسی مراحل",
      icon: "🏛️",
      en: "Academic Career",
      urduContent: `بطور لیکچرار آپ گورنمنٹ کالج ٹوبہ ٹیک سنگھ میں 1990 میں تعینات ہوئے۔ دسمبر 1990 میں پتوکی ٹرانسفر ہوگئی، پھر اپریل 1991 میں گورنمنٹ کالج اوکاڑہ۔

• 1996–2005 — پنجاب یونیورسٹی ادارہ علوم اسلامیہ — بطور لیکچرار
• 2005–2010 — اسسٹنٹ پروفیسر
• 2010–2014 — اسوسیٹ پروفیسر
• 2014–2019 — پروفیسر
• 2019 تا حال — ڈین، فیکلٹی ادارہ علوم اسلامیہ، جامعہ پنجاب

آپ نے 1990 سے اب تک یہ مضامین پڑھائے:
پی ایچ ڈی / ایم فل: اسلامی نظریہ، جدید مغربی ادب میں اسلام، اسلامی تاریخ، تحقیق کے طریقہ کار
ماسٹر: تفسیر القرآن، اسلامی تاریخ، اسلام اور فلسفہ، حدیث و علوم حدیث، عربی
بی اے: قرآن (ترجمہ و تفسیر)، حدیث، فقہ، ابتدائی مسلم تاریخ`,
      enContent: "35+ years of academic service. Lecturer 1990 at Government College, joined Punjab University IIS 1996, rose to Dean (2019–present). Teaches at PhD, MPhil, MA and BA levels.",
    },
    {
      title: "تعلیمی عہدے",
      icon: "🎖️",
      en: "Academic & Institutional Positions",
      urduContent: `• ڈین، فیکلٹی ادارہ علوم اسلامیہ، پنجاب یونیورسٹی لاہور
• ممبر متحدہ علماء بورڈ پنجاب
• وائس چیئرمین پیغام ٹی وی
• پروفیسر، ادارہ علوم اسلامیہ، پنجاب یونیورسٹی لاہور
• ایڈیٹر "القلم" (ایچ ای سی تسلیم شدہ ریسرچ جرنل) — 2008–2019
• کنٹرولر امتحانات — ادارہ علوم اسلامیہ، پنجاب یونیورسٹی
• ممبر بورڈ آف اسٹڈیز — ادارہ علوم اسلامیہ، پنجاب یونیورسٹی
• ممبر بورڈ آف فیکلٹی، فیکلٹی شعبہ علوم اسلامیہ و اورینٹل لرننگ (1999–2005)
• ممبر ڈاکٹورل پروگرام کمیٹی — پنجاب یونیورسٹی
• ممبر اتحاد بین المسلمین کمیٹی، حکومت پنجاب (2009 تا حال)
• ممبر پنجاب قرآن بورڈ، حکومت پنجاب (2011 تا حال)
• اسلامیات سبجیکٹ ایکسپرٹ — فیڈرل پبلک سروس کمیشن (2005، 2008، 2009 اب تک)
• اسلامیات سبجیکٹ ایکسپرٹ — پنجاب پبلک سروس کمیشن (2010 تا حال)
• اسلامیات سبجیکٹ ایکسپرٹ — ورچوئل یونیورسٹی پاکستان (2004)
• ممبر القلم ایجوکیشنل اینڈ ویلفیئر سوسائٹی (این جی او)، لاہور
• مذہبی ماہر — ریڈیو پاکستان لاہور (2003–2006)
• مذہبی ماہر — ریڈیو رمضان گلاسگو UK (2006–2007)
• مذہبی ماہر — پی ٹی وی، اے ٹی وی، لاہور نیوز، پیغام ٹی وی، جیو نیوز، دنیا نیوز، وقت ٹی وی، "ایس" ایم ٹی این ٹی وی`,
      enContent: "Dean IIS Punjab University, Vice Chairman Pegham TV, Editor Al-Qalam Journal 2008–2019, Member Punjab Quran Board, Expert at FPSC and PPSC, religious expert for multiple TV channels.",
    },
    {
      title: "بین الاقوامی کانفرنسز",
      icon: "🌍",
      en: "International Conferences",
      urduContent: `آپ نے 17 سے زائد ملکی و غیر ملکی بین الاقوامی کانفرنسوں میں شرکت کی اور کئی ایک میں اپنے فکر انگیز مقالے پیش کیے۔`,
      enContent: "Participated in 17+ national and international conferences, presenting research papers at leading Islamic and academic institutions worldwide.",
    },
    {
      title: "دینی و تبلیغی خدمات و سرگرمیاں",
      icon: "🕌",
      en: "Religious & Dawah Services",
      urduContent: `بتوفیق الٰہی آپ کی پوری زندگی دین کی تبلیغ و اشاعت میں صرف ہوئی۔

بچپن ہی میں والد محترم کے تبلیغی دوروں میں اکثر آپ اور آپ کے باقی بھائی ان کے ساتھ جایا کرتے تھے۔ جوانی کی دہلیز پر قدم رکھا تو اپنے والد محترم کے ساتھ بطور ان کے خادم اور معاون بھی سفر تبلیغ دین کے لیے کیے۔

گاؤں میں آپ مولانا محی الدین لکھوی رحمۃ اللہ علیہ کی غیر موجودگی میں خطبہ دیتے۔ 1990 سے جامعہ محمدیہ اوکاڑہ میں مستقل خطبہ دینا شروع کیا۔ 2005 میں برطانیہ چلے گئے اور وہاں ایک مسجد میں انگریزی زبان میں خطبہ دیتے رہے۔ 2009 سے تاحال مسجد المبارک لاہور میں آپ خطبہ و امامت نماز جمعہ کے فرائض سر انجام دے رہے ہیں۔

"اسلامی تہذیب و تمدن اور تہذیبوں کی عصری صورت حال" پر گورنر ہاؤس لاہور میں سال 2006 میں گورنر پنجاب کو بریفنگ دی۔

2015 سے اب تک ہر ہفتے پیغام ٹی وی پر آپ کا تفسیر القرآن کا درس جاری ہے جس سے دنیا بھر میں لوگ مستفید ہو رہے ہیں۔

تبلیغ دین کے لیے کئی دفعہ بیرون ملک بھی جاتے رہتے ہیں۔`,
      enContent: "Friday Khutbah at Masjid Al-Mubarak since 2009, weekly Tafseer on Pegham TV since 2015, briefed Governor Punjab in 2006, extensive national and international dawah travels.",
    },
    {
      title: "مشہور ٹی وی پروگرامز",
      icon: "📺",
      en: "Famous TV Programs",
      urduContent: `• تفسیر القرآن — پیغام ٹی وی
• اسلام اور الحاد — پیس ٹی وی
• دعا مومن کا ہتھیار — پیس ٹی وی
• حدیث جبرئیل — پیس ٹی وی
• روشنی — لاہور نیوز
• پیام صبح — دنیا نیوز
• پیام پاکستان — پیغام ٹی وی
• زکوٰۃ — پیس ٹی وی`,
      enContent: "Tafseer Al-Quran (Pegham TV), Islam & Atheism (Peace TV), Dua Momin Ka Hathiyar (Peace TV), Hadith Jibril (Peace TV), Roshni (Lahore News), Payam Subah (Dunya News), Zakat (Peace TV).",
    },
    {
      title: "ایوارڈز",
      icon: "🥇",
      en: "Awards & Distinctions",
      urduContent: `آپ نے ایم اے میں پہلی پوزیشن لے کر گولڈ میڈل حاصل کیا — پنجاب یونیورسٹی لاہور۔`,
      enContent: "Gold Medal — 1st Position in MA Islamiyat, University of the Punjab, Lahore.",
    },
    {
      title: "اساتذہ",
      icon: "🌟",
      en: "Notable Teachers",
      urduContent: `
     • مولانا محی الدین لکھوی رحمہ اللہ 
      • مولانا معین الدین لکھوی رحمہ اللہ
• شیخ الحدیث مولانا عبد الحلیم
• ڈاکٹر شبیر احمد عثمانی
• ڈاکٹر حمید اللہ
• حافظ محمود اختر ڈولہ
• پروفیسر ڈاکٹر جمیلہ شوکت
• ڈاکٹر ممتاز احمد سالک`,
      enContent: "Studied under Sheikh al-Hadith Maulana Abdul Haleem (Ijazah in Hadith), Dr. Shubbir Ahmad, Dr. Hameedullah, Prof. Dr. Jameela Shaukat, Mumtaz Ahmad Salik, and others.",
    },
    {
      title: "کتب",
      icon: "📚",
      en: "Books Published",
      urduContent: `• حریت فرد کا اسلامی تصور (مقالہ پی ایچ ڈی)
• رابطہ عالم اسلامی کی دینی خدمات (مقالہ ایم اے)
• آبادی اور ترقی (کتابچہ — مکتبہ دار السلام)`,
      enContent: "3 major books: PhD thesis on individual freedom in Islam, MA thesis on Rabita al-Alam al-Islami, and a booklet on population and development (Maktaba Dar al-Salam).",
    },
    {
      title: "شائع شدہ آرٹیکلز (منتخب)",
      icon: "📝",
      en: "Selected Published Articles (47+ Total)",
      urduContent: `1. مطالعہ سیرت کا مادی منہج — القلم، جامعہ پنجاب (V22/2، دسمبر 2017، صفحہ 181–207)
2. تصور جلال — اقبال اور رومانوی مفکرین کا تقابلی مطالعہ — القلم (V12/2، دسمبر 2016، صفحہ 222–231)
3. پاکستان میں عورتوں کے حق وراثت سے محرومی — مجلہ تحقیق، اورینٹل کالج (2011، V31)
4. تحدید ملکیت اور گردش دولت کا اسلامی تصور — BZU ملتان (V7، جون 2011، صفحہ 29–51)
5. بین المذاہب ہم آہنگی اور رواداری — القلم (V25/33، جون 2010، صفحہ 122–139)
6. شاہ ولی اللہ کے اصول تجدید — ابحاث (V7/27، ستمبر 2022، صفحہ 1–20)
7. ہجرت حبشہ کے اسباب — جہات الاسلام، جامعہ پنجاب (V12/2، ستمبر 2022، صفحہ 112–126)

English articles include:
• A Glimpse in the History of Nationalism in Muslim World — Al-Adhwa 2014
• Faith in Predestination and its Philosophy — Al-Adhwa 2010
• The Concept of Peace and Security in Islam — McGill University Canada, 2008
• Islam and Fertility Regulations — WASET France 2010
• The Economic Terminologies of Shah Waliullah — IJSE 2022
• Psychological Aspects of Harassment at Workplace — PJIP 2022
• Males and the Islamic Family System — Webology 2022
• Introduction, History, Dangers of Cyber Crimes — Al-Qalam 2020
• Methodology of Tafseer e Muhammadi — Al-Qalam 2008
... and 38+ more published works.`,
      enContent: "47+ peer-reviewed articles published in Al-Adhwa, Al-Qalam (Punjab University), BZU Multan, WASET France, McGill University (book chapter), Webology, and other national and international journals.",
    },
  ];

  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionHeader title="Biography" urdu="سوانح حیات" />

        {/* Header card */}
        <div style={{ background: `linear-gradient(135deg,${COLORS.darkGreen},${COLORS.green})`, padding: "36px 40px", borderRadius: 2, marginBottom: 36 }}>
          <div style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ width: 120, height: 120, borderRadius: "50%", border: `3px solid ${COLORS.goldLight}`, boxShadow: "0 0 0 6px rgba(184,151,42,0.2)", overflow: "hidden", flexShrink: 0, background: COLORS.green }}>
              <img src="/profile.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:48px">👤</div>`; }} />
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <h2 style={{ fontFamily: "'Amiri',serif", fontSize: 26, color: COLORS.goldLight, marginBottom: 4 }}>Dr. Muhammad Hammad Lakhvi</h2>
              <div className="urdu" style={{ fontSize: 17, color: "rgba(250,246,239,0.9)", marginBottom: 6, lineHeight: 2 }}>پروفیسر ڈاکٹر محمد حماد لکھوی حفظہ اللہ</div>
              <div className="urdu" style={{ fontSize: 14, color: COLORS.goldLight, lineHeight: 2, marginBottom: 12 }}>(ڈین فیکلٹی ادارہ علوم اسلامیہ جامعہ پنجاب لاہور)</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["پیدائش: 1965، دیپالپور", "پوسٹ ڈاکٹریٹ — گلاسگو", "پی ایچ ڈی — پنجاب یونیورسٹی"].map(b => (
                  <span key={b} className="urdu" style={{ background: "rgba(184,151,42,0.2)", border: `1px solid ${COLORS.gold}`, color: COLORS.goldLight, padding: "3px 10px", fontSize: 12, borderRadius: 2, lineHeight: 2 }}>{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {sections.map((s, i) => (
          <div key={s.title} style={{ marginBottom: 20, background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, overflow: "hidden", animation: `fadeUp 0.6s ease ${i * 0.04}s both` }}>
            <div style={{ background: `${COLORS.green}11`, padding: "13px 22px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <span className="urdu" style={{ fontSize: 16, color: COLORS.darkGreen, lineHeight: 2 }}>{s.title}</span>
              <span style={{ fontSize: 11, color: COLORS.textLight, letterSpacing: "0.08em", textTransform: "uppercase", marginLeft: 4 }}>{s.en}</span>
            </div>
            <div style={{ padding: "20px 24px" }}>
              <div className="urdu" style={{ fontSize: 15, lineHeight: 2.4, color: COLORS.text, marginBottom: 12, whiteSpace: "pre-line" }}>{s.urduContent}</div>
              <div style={{ borderTop: `1px dashed ${COLORS.border}`, paddingTop: 10 }}>
                <p style={{ fontSize: 12, lineHeight: 1.8, color: COLORS.textLight, fontStyle: "italic" }}>{s.enContent}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Closing dua */}
        <div style={{ background: `${COLORS.gold}11`, border: `2px solid ${COLORS.gold}`, padding: "28px", borderRadius: 2, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🥇</div>
          <div className="urdu" style={{ fontSize: 22, color: COLORS.darkGreen, marginBottom: 4, lineHeight: 2 }}>گولڈ میڈل — پنجاب یونیورسٹی</div>
          <div style={{ fontFamily: "'Amiri',serif", fontSize: 18, color: COLORS.darkGreen, marginBottom: 8 }}>Gold Medal — Punjab University</div>
          <p style={{ color: COLORS.textLight, fontSize: 14, marginBottom: 16 }}>1st Position in MA Islamic Studies · ایم اے اسلامیات میں اول پوزیشن</p>
          <div className="urdu" style={{ fontSize: 16, color: COLORS.green, lineHeight: 2.6 }}>
            ماشاء اللہ لا قوۃ الا باللہ 
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ContactPage ───────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader title="Contact" urdu="رابطہ" sub="Get in touch for lectures, fatawa, or media" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          <div>
            <h3 style={{ fontFamily: "'Amiri',serif", fontSize: 22, color: COLORS.darkGreen, marginBottom: 24 }}>Contact Information</h3>
            {[
              { icon: "🕌", label: "Masjid", val: "Masjid Al-Mubarak, Lahore (Friday Khutbah)" },
              { icon: "🏛️", label: "Formerly", val: "Institute of Islamic Studies, University of the Punjab" },
              { icon: "📺", label: "Pegham TV", val: "Weekly Tafseer Al-Quran Broadcast" },
              { icon: "🌐", label: "Organization", val: "Markazi Jamiat Ahlul Hadith Pakistan — Deputy Amir" },
              { icon: "🏢", label: "Foundation", val: "Faith Welfare Foundation — President (2024–)" },
            ].map(c => (
              <div key={c.label} style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "flex-start" }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: COLORS.gold, marginBottom: 2 }}>{c.label}</div>
                  <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.5 }}>{c.val}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 24, padding: "20px", background: COLORS.darkGreen, borderRadius: 2 }}>
              <div className="urdu" style={{ fontSize: 16, color: COLORS.goldLight, marginBottom: 8 }}>فیتھ ویلفیئر فاؤنڈیشن</div>
              <p style={{ color: "rgba(250,246,239,0.7)", fontSize: 12, lineHeight: 1.7 }}>For institutional inquiries, invitations to conferences, and media appearances, please use the contact form.</p>
            </div>
          </div>
          <div>
            {sent ? (
              <div style={{ textAlign: "center", padding: "60px 20px", animation: "fadeIn 0.5s ease" }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
                <div style={{ fontFamily: "'Amiri',serif", fontSize: 24, color: COLORS.darkGreen, marginBottom: 8 }}>Message Sent!</div>
                <p style={{ color: COLORS.textLight, fontSize: 14 }}>JazakAllahu Khayran. We will respond as soon as possible.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[{ key: "name", label: "Your Name", type: "text", placeholder: "Muhammad Ali" }, { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com" }, { key: "subject", label: "Subject", type: "text", placeholder: "Question about..." }].map(f => (
                  <div key={f.key}>
                    <label style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: COLORS.textLight, marginBottom: 6 }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} style={{ width: "100%", padding: "12px 16px", border: `1px solid ${COLORS.border}`, borderRadius: 2, fontSize: 14, fontFamily: "'Libre Baskerville',serif", background: COLORS.white, outline: "none", color: COLORS.text }} />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: COLORS.textLight, marginBottom: 6 }}>Message</label>
                  <textarea placeholder="Your question or message..." rows={5} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} style={{ width: "100%", padding: "12px 16px", border: `1px solid ${COLORS.border}`, borderRadius: 2, fontSize: 14, fontFamily: "'Libre Baskerville',serif", background: COLORS.white, outline: "none", resize: "vertical", color: COLORS.text }} />
                </div>
                <button onClick={() => { if (form.name && form.email && form.message) setSent(true); }} style={{ background: `linear-gradient(135deg,${COLORS.darkGreen},${COLORS.green})`, color: COLORS.cream, border: "none", padding: "14px 32px", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2, fontWeight: 700 }}>Send Message →</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer({ setActive }) {
  return (
    <footer style={{ background: COLORS.charcoal, padding: "60px 24px 24px", color: "rgba(250,246,239,0.7)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: "'Amiri',serif", fontSize: 20, color: COLORS.goldLight, marginBottom: 8 }}>Dr. Muhammad Hammad Lakhvi</div>
            <div className="urdu" style={{ fontSize: 14, color: "rgba(250,246,239,0.5)", lineHeight: 2 }}> سابق ڈین، ادارہ علوم اسلامیہ، جامعہ پنجاب </div>
          </div>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: COLORS.gold, marginBottom: 16 }}>Quick Links</div>
            {NAV_ITEMS.map(n => <button key={n.id} onClick={() => setActive(n.id)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", color: "rgba(250,246,239,0.6)", fontSize: 13, padding: "4px 0", fontFamily: "'Libre Baskerville',serif", textAlign: "left" }}>{n.label}</button>)}
          </div>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: COLORS.gold, marginBottom: 16 }}>Organizations</div>
            {["Markazi Jamiat Ahlul Hadith", "Pegham TV", "Faith Welfare Foundation", "Punjab Quran Board"].map(o => <div key={o} style={{ fontSize: 13, padding: "4px 0", color: "rgba(250,246,239,0.6)" }}>— {o}</div>)}
          </div>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: COLORS.gold, marginBottom: 16 }}>Qualifications</div>
            {["Post-Doctorate, Glasgow UK", "Ph.D. Islamic Studies", "LLB Law", "MA Islamiyat — Gold Medal", "MA Arabic"].map(q => <div key={q} style={{ fontSize: 12, padding: "4px 0", color: "rgba(250,246,239,0.6)" }}>✦ {q}</div>)}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(184,151,42,0.2)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div className="urdu" style={{ fontSize: 14, color: "rgba(250,246,239,0.4)" }}>بسم اللہ الرحمن الرحیم</div>
          <div style={{ fontSize: 12, color: "rgba(250,246,239,0.4)" }}>© 2026 Dr. Muhammad Hammad Lakhvi · All rights reserved</div>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("home");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedProgramId, setSelectedProgramId] = useState(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [active]);

  const handleVideoClick = (v) => setSelectedVideo(v);
  const handleProgramClick = (id) => {
    setSelectedProgramId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const pages = {
    home: <HomePage setActive={setActive} onProgramClick={handleProgramClick} />,
    biography: <BiographyPage />,
    shorts: <ShortsPage onVideoClick={handleVideoClick} />,
    lectures: <LecturesPage onVideoClick={handleVideoClick} />,
    articles: <ArticlesPage />,
    fatwa: <FatwaPage />,
    events: <EventsPage />,
    community: <CommunityPage onProgramClick={handleProgramClick} />,
    contact: <ContactPage />,
  };

  const renderContent = () => {
    if (selectedProgramId) {
      const program = TV_PROGRAMS_DATA.find(p => p.id === selectedProgramId);
      return (
        <TVProgramDetailPage 
          program={program} 
          onBack={() => setSelectedProgramId(null)} 
          onVideoClick={handleVideoClick} 
        />
      );
    }
    return pages[active] || pages.home;
  };
  return (
    <>
      <style>{fonts + globalStyle}</style>
      <NavBar active={active} setActive={setActive} />
      <main>{renderContent()}</main>
      <Footer setActive={setActive} />
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      <WhatsAppButton />
    </>
  );
}