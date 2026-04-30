export const COLORS = {
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

const isProd = import.meta.env.PROD;
export const API_BASE = isProd ? "/api" : (import.meta.env.VITE_API_URL || "http://localhost:5001/api");
export const IMG_BASE = isProd ? "" : (import.meta.env.VITE_IMG_URL || "http://localhost:5001");

export const NAV_ITEMS = [
  { id: "home", label: "Home", path: "/" },
  { id: "biography", label: "Biography", path: "/biography-of-dr-hammad-lakhvi" },
  { id: "shorts", label: "Short Clips", path: "/islamic-short-clips" },
  { id: "lectures", label: "Lectures", path: "/islamic-lectures-and-series" },
  { id: "articles", label: "Articles", path: "/research-articles-by-dr-hammad-lakhvi" },
  { id: "fatwa", label: "Q&A / Fatwas", path: "/islamic-qa-and-fatwa" },
  { id: "events", label: "Events", path: "/events-and-activities" },
  { id: "community", label: "Community", path: "/tv-programs-and-community" },
  { id: "contact", label: "Contact", path: "/contact-us" },
];

export const GLOBAL_STYLE = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${COLORS.cream}; font-family: 'Libre Baskerville', serif; color: ${COLORS.text}; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${COLORS.cream}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.gold}; border-radius: 3px; }
  .urdu { font-family: 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif; direction: rtl; text-align: right; line-height: 2.2; word-spacing: 2px; }
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
  .payam-year-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,0.2) !important; }
  .payam-year-card { transition: all 0.3s ease; cursor: pointer; }
  @media (max-width: 820px) {
    .hero-layout { flex-direction: column !important; align-items: center !important; padding: 60px 24px !important; }
    .hero-text { align-items: center !important; text-align: center !important; }
    .hero-text .urdu { text-align: center !important; }
    .hero-pic { width: 220px !important; height: 280px !important; }
    .hero-creds { justify-content: center !important; }
    .hero-btns { justify-content: center !important; }
  }
  .series-detail-header { display: flex; flex-wrap: wrap; background: linear-gradient(135deg, ${COLORS.darkGreen}, ${COLORS.green}); border-radius: 2px; overflow: hidden; margin-bottom: 40px; }
  .series-detail-thumb-container { width: 320px; aspect-ratio: 16/9; flex-shrink: 0; background: #000; position: relative; overflow: hidden; }
  .series-detail-info { flex: 1; padding: 32px 36px; min-width: 250px; }
  @media (max-width: 768px) {
    .series-detail-header { margin-bottom: 24px; }
    .series-detail-thumb-container { width: 100% !important; }
    .series-detail-info { padding: 24px 20px !important; }
    .series-detail-info .urdu { font-size: 22px !important; text-align: center !important; }
    .series-detail-info h3, .series-detail-info p, .series-detail-info div { text-align: center !important; }
    .series-detail-info .series-meta { justify-content: center !important; }
    .article-detail-meta-grid { grid-template-columns: 1fr !important; }
  }
  
  /* Rich Text Rendering Styles */
  .custom-rich-text ul, .custom-rich-text ol { padding-left: 2.5em; margin-bottom: 1em; }
  .custom-rich-text.urdu ul, .custom-rich-text.urdu ol { padding-left: 0; padding-right: 2.5em; }
  .custom-rich-text li { margin-bottom: 0.5em; list-style-position: outside; }
  .custom-rich-text p { margin-bottom: 0.8em; }
  .custom-rich-text strong, .custom-rich-text b { font-weight: bold; }
  .custom-rich-text em, .custom-rich-text i { font-style: italic; }

  /* Custom Fonts for Rich Text Editor */
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="jameel-noori"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="jameel-noori"]::before {
    content: "Jameel Noori";
    font-family: 'Jameel Noori Nastaleeq', serif;
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="arabic-calligraphy"]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="arabic-calligraphy"]::before {
    content: "Arabic Calligraphy";
    font-family: 'Aref Ruqaa', serif;
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label:not([data-value])::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item:not([data-value])::before {
    content: "Default Font";
  }

  .ql-font-jameel-noori {
    font-family: 'Jameel Noori Nastaleeq', serif !important;
  }
  .ql-font-arabic-calligraphy {
    font-family: 'Aref Ruqaa', serif !important;
  }
`;

export const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Aref+Ruqaa:wght@400;700&display=swap');
@font-face {
  font-family: 'Jameel Noori Nastaleeq';
  src: url('https://cdn.jsdelivr.net/gh/naqashali/Jameel-Noori-Nastaleeq-Web-Font@master/JameelNooriNastaleeq.woff2') format('woff2'),
       url('https://cdn.jsdelivr.net/gh/naqashali/Jameel-Noori-Nastaleeq-Web-Font@master/JameelNooriNastaleeq.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}`;
