import { useState, useEffect, useRef } from "react";

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
  .fade-up { animation: fadeUp 0.7s ease forwards; }
  .fade-in { animation: fadeIn 0.5s ease forwards; }
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
  { id: "dQw4w9WgXcQ", title: "تفسیر القرآن — مختصر درس", subtitle: "Tafseer Al-Quran Short" },
  { id: "ScMzIvxBSi4", title: "حدیث جبرئیل — خلاصہ", subtitle: "Hadith Jibril Summary" },
  { id: "3JZ_D3ELwOQ", title: "اسلام اور الحاد", subtitle: "Islam & Atheism" },
  { id: "L_jWHffIx5E", title: "دعا مومن کا ہتھیار", subtitle: "Dua — The Believer's Weapon" },
  { id: "fJ9rUzIMcZQ", title: "زکوۃ — اہمیت و فضائل", subtitle: "Importance of Zakat" },
  { id: "hT_nvWreIhg", title: "توبہ اور استغفار", subtitle: "Repentance & Forgiveness" },
];

const LONG_VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "تفسیر القرآن — مکمل درس سلسلہ", subtitle: "Complete Tafseer Series — Pegham TV", duration: "45 min" },
  { id: "ScMzIvxBSi4", title: "حدیث اور علوم حدیث", subtitle: "Sciences of Hadith — Full Lecture", duration: "60 min" },
  { id: "3JZ_D3ELwOQ", title: "اسلامی فلسفہ اور مغربی فکر", subtitle: "Islamic Philosophy vs Western Thought", duration: "52 min" },
  { id: "L_jWHffIx5E", title: "مسلم خاندانی نظام", subtitle: "Islamic Family System — University Lecture", duration: "70 min" },
];

const ARTICLES = [
  { title: "مطالعہ سیرت کا مادی منہج", journal: "Al-Qalam, Punjab University", year: "2017", lang: "urdu" },
  { title: "A Glimpse in the History of Nationalism in Muslim World", journal: "Al-Adhwa, P.U. LHR", year: "2014", lang: "en" },
  { title: "Faith in Predestination and its Philosophy — An Islamic Perspective", journal: "Al-Adhwa, P.U. LHR", year: "2010", lang: "en" },
  { title: "Islam and Fertility Regulations", journal: "WASET e-Journal, France", year: "2010", lang: "en" },
  { title: "تصور جلال — اقبال اور رومانوی مفکرین کا تقابلی مطالعہ", journal: "Al-Qalam, Punjab University", year: "2016", lang: "urdu" },
  { title: "The Concept of Peace and Security in Islam", journal: "McGill University Canada (Book Chapter)", year: "2008", lang: "en" },
  { title: "بین المذاہب ہم آہنگی اور رواداری", journal: "Al-Qalam, Punjab University", year: "2010", lang: "urdu" },
  { title: "Psychological Aspects of Harassment at Workplace — Islamic Remedies", journal: "Pakistan Journal of Islamic Philosophy", year: "2022", lang: "en" },
];

const FATWAS = [
  { q: "Is cryptocurrency permissible in Islam?", a: "This is a matter of scholarly debate. Contemporary scholars differ based on whether digital currencies fulfill the conditions of valid exchange. Please consult the full recorded lecture for a detailed analysis." },
  { q: "What is the ruling on combining prayers while traveling?", a: "Combining prayers (Jam'a) is permissible during travel according to the established Sunnah. The Hanafi, Shafi'i, Maliki and Hanbali schools differ on specific conditions." },
  { q: "Can women attend Friday prayers at the mosque?", a: "Women's attendance at mosques has strong evidence in primary Islamic sources. Our research article 'Attendance of Women in Mosques' (2018) provides a comprehensive legal analysis." },
];

const EVENTS = [
  { date: "15 March 2026", title: "Friday Khutbah — Masjid Al-Mubarak Lahore", type: "Regular", recurring: true },
  { date: "22 March 2026", title: "Tafseer Al-Quran — Pegham TV Live Broadcast", type: "TV Program", recurring: true },
  { date: "5 April 2026", title: "International Islamic Studies Conference — Islamabad", type: "Conference", recurring: false },
  { date: "12 April 2026", title: "Faith Welfare Foundation Annual Gathering", type: "Community", recurring: false },
  { date: "Every Saturday", title: "Online Tafseer Halqa — Zoom", type: "Online", recurring: true },
];

function NavBar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .nav-link { background: none; border: none; cursor: pointer; font-family: 'Libre Baskerville', serif; font-size: 13px; letter-spacing: 0.08em; padding: 6px 12px; color: ${COLORS.cream}; transition: color 0.2s; text-transform: uppercase; }
        .nav-link:hover, .nav-link.active { color: ${COLORS.goldLight}; }
        .nav-link.active { border-bottom: 2px solid ${COLORS.goldLight}; }
        .hamburger { background: none; border: none; cursor: pointer; display: none; flex-direction: column; gap: 5px; padding: 4px; }
        .hamburger span { display: block; width: 24px; height: 2px; background: ${COLORS.cream}; transition: all 0.3s; }
        @media (max-width: 900px) { .nav-desktop { display: none !important; } .hamburger { display: flex !important; } }
        .mobile-menu { position: fixed; top: 64px; left: 0; right: 0; background: ${COLORS.darkGreen}; padding: 16px; z-index: 999; border-bottom: 2px solid ${COLORS.gold}; display: flex; flex-direction: column; gap: 4px; }
      `}</style>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? `rgba(26,58,42,0.97)` : COLORS.darkGreen,
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.3)" : "none",
        transition: "all 0.3s",
        borderBottom: `1px solid rgba(184,151,42,0.3)`,
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <button onClick={() => setActive("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <span style={{ fontFamily: "'Amiri', serif", fontSize: 18, color: COLORS.goldLight, letterSpacing: "0.05em", lineHeight: 1.2 }}>Dr. Muhammad Hammad Lakhvi</span>
            <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 10, color: COLORS.cream, opacity: 0.7, letterSpacing: "0.15em", textTransform: "uppercase" }}>Islamic Scholar · Professor Emeritus</span>
          </button>
          <div className="nav-desktop" style={{ display: "flex", gap: 2 }}>
            {NAV_ITEMS.map(n => (
              <button key={n.id} className={`nav-link${active === n.id ? " active" : ""}`} onClick={() => setActive(n.id)}>{n.label}</button>
            ))}
          </div>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            {NAV_ITEMS.map(n => (
              <button key={n.id} className={`nav-link${active === n.id ? " active" : ""}`} onClick={() => { setActive(n.id); setMenuOpen(false); }} style={{ textAlign: "left" }}>{n.label}</button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}

function ArabicOrnament() {
  return (
    <div style={{ textAlign: "center", color: COLORS.gold, fontSize: 28, opacity: 0.6, letterSpacing: 8, margin: "8px 0" }}>
      ❧ ✦ ❧
    </div>
  );
}

function SectionHeader({ title, urdu, sub }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <ArabicOrnament />
      {urdu && <p className="urdu" style={{ fontSize: 22, color: COLORS.green, marginBottom: 4 }}>{urdu}</p>}
      <h2 style={{ fontFamily: "'Amiri', serif", fontSize: "clamp(28px,4vw,42px)", color: COLORS.darkGreen, fontWeight: 700, letterSpacing: "0.02em" }}>{title}</h2>
      {sub && <p style={{ color: COLORS.textLight, fontSize: 14, marginTop: 8, letterSpacing: "0.1em", textTransform: "uppercase" }}>{sub}</p>}
      <div style={{ width: 60, height: 2, background: `linear-gradient(90deg,${COLORS.gold},${COLORS.goldLight})`, margin: "16px auto 0" }} />
    </div>
  );
}

function HomePage({ setActive }) {
  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        background: `linear-gradient(160deg, ${COLORS.darkGreen} 0%, ${COLORS.green} 60%, #1a4a30 100%)`,
        position: "relative", overflow: "hidden", paddingTop: 64,
      }}>
        {/* Decorative pattern */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px", textAlign: "center", position: "relative", animation: "fadeUp 1s ease" }}>
          {/* Gold crescent */}
          <div style={{ fontSize: 48, marginBottom: 16, animation: "shimmer 3s infinite" }}>☽</div>
          <div style={{ fontFamily: "'Noto Nastaliq Urdu', serif", fontSize: "clamp(18px,3vw,26px)", color: COLORS.goldLight, marginBottom: 16, direction: "rtl", lineHeight: 2 }}>
            بسم اللہ الرحمن الرحیم
          </div>
          <h1 style={{ fontFamily: "'Amiri', serif", fontSize: "clamp(36px,6vw,72px)", color: COLORS.cream, fontWeight: 700, lineHeight: 1.1, marginBottom: 16, letterSpacing: "0.02em" }}>
            Dr. Muhammad<br />Hammad Lakhvi
          </h1>
          <div style={{ width: 100, height: 2, background: COLORS.gold, margin: "0 auto 24px" }} />
          <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(14px,2vw,18px)", color: "rgba(250,246,239,0.85)", marginBottom: 8, lineHeight: 1.7 }}>
            Former Dean & Retired Professor, Institute of Islamic Studies<br />University of the Punjab, Lahore
          </p>
          <p style={{ fontFamily: "'Noto Nastaliq Urdu', serif", fontSize: 18, color: COLORS.goldLight, marginBottom: 40, direction: "rtl", lineHeight: 2 }}>
            نائب امیر مرکزی جمیعت اہلحدیث پاکستان
          </p>

          {/* Credentials row */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            {["Post-Doctorate — Glasgow, UK", "Ph.D. Islamic Studies — Punjab Univ.", "LLB Law — Punjab University"].map(c => (
              <span key={c} style={{ background: "rgba(184,151,42,0.2)", border: `1px solid ${COLORS.gold}`, color: COLORS.goldLight, padding: "6px 16px", borderRadius: 2, fontSize: 12, letterSpacing: "0.05em", fontFamily: "'Libre Baskerville', serif" }}>{c}</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {[["Watch Lectures", "shorts"], ["Read Articles", "articles"], ["Biography", "biography"], ["Contact", "contact"]].map(([label, id]) => (
              <button key={id} onClick={() => setActive(id)} style={{
                background: id === "shorts" ? `linear-gradient(135deg,${COLORS.gold},${COLORS.goldLight})` : "transparent",
                border: `2px solid ${COLORS.gold}`, color: id === "shorts" ? COLORS.darkGreen : COLORS.cream,
                padding: "12px 28px", fontSize: 13, fontFamily: "'Libre Baskerville', serif",
                letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
                borderRadius: 2, fontWeight: id === "shorts" ? 700 : 400, transition: "all 0.2s",
              }}>{label}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: COLORS.darkGreen, padding: "40px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 32, textAlign: "center" }}>
          {[["35+", "Years Teaching"], ["47+", "Research Papers"], ["17+", "Int'l Conferences"], ["10+", "TV Programs"], ["2009", "Masjid Al-Mubarak"], ["300+", "Family Legacy (Years)"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Amiri', serif", fontSize: 40, color: COLORS.goldLight, fontWeight: 700 }}>{n}</div>
              <div style={{ fontSize: 11, color: "rgba(250,246,239,0.7)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Programs */}
      <section style={{ padding: "80px 24px", background: COLORS.cream }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeader title="Featured TV Programs" urdu="مشہور ٹی وی پروگرامز" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
            {[
              { icon: "📖", name: "تفسیر القرآن", channel: "Pegham TV" },
              { icon: "🌅", name: "پیام صبح", channel: "Dunya News" },
              { icon: "🙏", name: "دعا مومن کا ہتھیار", channel: "Peace TV" },
              { icon: "💡", name: "اسلام اور الحاد", channel: "Peace TV" },
              { icon: "⚖️", name: "حدیث جبرئیل", channel: "Peace TV" },
              { icon: "🌙", name: "روشنی", channel: "Lahore News" },
            ].map(p => (
              <div key={p.name} style={{
                background: COLORS.white, border: `1px solid ${COLORS.border}`,
                padding: "24px 20px", textAlign: "center", borderRadius: 2,
                transition: "all 0.2s", cursor: "pointer",
                borderTop: `3px solid ${COLORS.gold}`,
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{p.icon}</div>
                <div className="urdu" style={{ fontSize: 16, color: COLORS.darkGreen, fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: COLORS.textLight, letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.channel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function YouTubeEmbed({ videoId, title }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div style={{ position: "relative", paddingBottom: "56.25%", background: COLORS.charcoal, borderRadius: 2, overflow: "hidden" }}>
      {playing ? (
        <iframe
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={title}
        />
      ) : (
        <div
          onClick={() => setPlaying(true)}
          style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: `linear-gradient(135deg,${COLORS.darkGreen},#000)` }}
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
            alt={title}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
          />
          <div style={{
            width: 64, height: 64, background: COLORS.gold, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}>
            <span style={{ fontSize: 24, marginLeft: 4 }}>▶</span>
          </div>
        </div>
      )}
    </div>
  );
}

function ShortsPage() {
  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader title="Short Video Clips" urdu="مختصر ویڈیوز" sub="Watch & share short Islamic lectures" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 28 }}>
          {SHORT_CLIPS.map((v, i) => (
            <div key={v.id} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", animation: `fadeUp 0.6s ease ${i * 0.08}s both` }}>
              <YouTubeEmbed videoId={v.id} title={v.title} />
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

function LecturesPage() {
  const [tab, setTab] = useState("quran");
  const tabs = [
    { id: "quran", label: "Quran" },
    { id: "tafseer", label: "Tafseer" },
    { id: "hadeeth", label: "Hadeeth" },
    { id: "long", label: "Full Lectures" },
  ];

  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader title="Lectures & Durus" urdu="دروس و خطبات" sub="Quran · Tafseer · Hadeeth" />

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 40, borderBottom: `2px solid ${COLORS.border}`, flexWrap: "wrap" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: "none", border: "none", cursor: "pointer", padding: "12px 28px",
              fontFamily: "'Libre Baskerville', serif", fontSize: 14, letterSpacing: "0.05em",
              color: tab === t.id ? COLORS.green : COLORS.textLight,
              borderBottom: tab === t.id ? `3px solid ${COLORS.gold}` : "3px solid transparent",
              fontWeight: tab === t.id ? 700 : 400, marginBottom: -2, transition: "all 0.2s",
            }}>{t.label}</button>
          ))}
        </div>

        {tab === "long" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(360px,1fr))", gap: 28 }}>
            {LONG_VIDEOS.map((v, i) => (
              <div key={v.id + i} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, overflow: "hidden", animation: `fadeUp 0.5s ease ${i * 0.1}s both` }}>
                <YouTubeEmbed videoId={v.id} title={v.title} />
                <div style={{ padding: "20px" }}>
                  <div className="urdu" style={{ fontSize: 17, color: COLORS.darkGreen, fontWeight: 600, marginBottom: 6 }}>{v.title}</div>
                  <div style={{ fontSize: 12, color: COLORS.textLight, marginBottom: 8 }}>{v.subtitle}</div>
                  <span style={{ background: `${COLORS.gold}22`, color: COLORS.gold, padding: "2px 10px", fontSize: 11, borderRadius: 2 }}>⏱ {v.duration}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 24 }}>
            {SHORT_CLIPS.slice(0, 6).map((v, i) => (
              <div key={v.id + tab + i} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, overflow: "hidden", animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}>
                <YouTubeEmbed videoId={v.id} title={v.title} />
                <div style={{ padding: "14px 16px" }}>
                  <div className="urdu" style={{ fontSize: 15, color: COLORS.darkGreen, fontWeight: 600, marginBottom: 4 }}>{v.title}</div>
                  <div style={{ fontSize: 12, color: COLORS.textLight, textTransform: "capitalize" }}>{tab} Lecture</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* YouTube Channel CTA */}
        <div style={{ marginTop: 48, textAlign: "center", padding: "40px", background: COLORS.darkGreen, borderRadius: 2 }}>
          <div style={{ fontFamily: "'Amiri', serif", fontSize: 24, color: COLORS.goldLight, marginBottom: 8 }}>Watch All Lectures on YouTube</div>
          <p style={{ color: "rgba(250,246,239,0.7)", marginBottom: 20, fontSize: 14 }}>Subscribe to the official channel for weekly Tafseer durus and more</p>
          <a href="https://www.youtube.com/@hammadlakhvi" target="_blank" rel="noreferrer" style={{ display: "inline-block", background: COLORS.gold, color: COLORS.darkGreen, padding: "12px 32px", textDecoration: "none", fontWeight: 700, fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 2 }}>🎬 YouTube Channel →</a>
        </div>
      </div>
    </div>
  );
}

function ArticlesPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? ARTICLES : ARTICLES.filter(a => a.lang === filter);

  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionHeader title="Research Articles" urdu="علمی مقالات" sub="47+ peer-reviewed publications" />

        <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
          {[["all", "All"], ["en", "English"], ["urdu", "اردو"]].map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)} style={{
              background: filter === v ? COLORS.green : "transparent", border: `1px solid ${filter === v ? COLORS.green : COLORS.border}`,
              color: filter === v ? COLORS.cream : COLORS.text, padding: "8px 20px", fontSize: 13,
              cursor: "pointer", borderRadius: 2, fontFamily: "'Libre Baskerville', serif",
              transition: "all 0.2s",
            }}>{l}</button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((a, i) => (
            <div key={i} style={{
              background: COLORS.white, border: `1px solid ${COLORS.border}`, padding: "20px 24px",
              display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
              borderLeft: `4px solid ${COLORS.gold}`, animation: `slideIn 0.4s ease ${i * 0.05}s both`,
            }}>
              <div style={{ flex: 1 }}>
                <div className={a.lang === "urdu" ? "urdu" : ""} style={{ fontSize: a.lang === "urdu" ? 16 : 15, color: COLORS.darkGreen, fontWeight: 600, marginBottom: 4 }}>{a.title}</div>
                <div style={{ fontSize: 12, color: COLORS.textLight }}>{a.journal}</div>
              </div>
              <span style={{ background: `${COLORS.gold}22`, color: COLORS.gold, padding: "4px 12px", fontSize: 12, borderRadius: 2, flexShrink: 0 }}>{a.year}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: "20px 24px", background: `${COLORS.green}11`, border: `1px solid ${COLORS.green}44`, borderRadius: 2, textAlign: "center" }}>
          <p style={{ color: COLORS.green, fontSize: 14 }}>Full bibliography available upon request · <strong>47+ publications</strong> in national and international journals</p>
        </div>
      </div>
    </div>
  );
}

function FatwaPage() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader title="Q&A / Fatwas" urdu="سوال و جواب / فتاوی" sub="Islamic Jurisprudence & Guidance" />

        <div style={{ background: `${COLORS.gold}11`, border: `1px solid ${COLORS.gold}44`, padding: "16px 24px", borderRadius: 2, marginBottom: 32 }}>
          <p style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.7 }}>
            <strong>Note:</strong> The responses here are brief summaries. For comprehensive fatawa and detailed legal opinions, please watch the full recorded sessions or contact us directly.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FATWAS.map((f, i) => (
            <div key={i} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, overflow: "hidden" }}>
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{
                width: "100%", background: "none", border: "none", cursor: "pointer", padding: "20px 24px",
                display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16,
                textAlign: "left", fontFamily: "'Libre Baskerville', serif",
              }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ color: COLORS.gold, fontSize: 20, flexShrink: 0 }}>❓</span>
                  <span style={{ fontSize: 15, color: COLORS.darkGreen, fontWeight: 600 }}>{f.q}</span>
                </div>
                <span style={{ color: COLORS.gold, fontSize: 20, flexShrink: 0 }}>{openIdx === i ? "▲" : "▼"}</span>
              </button>
              {openIdx === i && (
                <div style={{ padding: "0 24px 20px 56px", borderTop: `1px solid ${COLORS.border}`, paddingTop: 16 }}>
                  <p style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.8 }}>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, padding: "32px", background: COLORS.darkGreen, borderRadius: 2, textAlign: "center" }}>
          <div style={{ fontFamily: "'Amiri', serif", fontSize: 22, color: COLORS.goldLight, marginBottom: 8 }}>Submit Your Question</div>
          <p style={{ color: "rgba(250,246,239,0.7)", fontSize: 13, marginBottom: 20 }}>For personal Islamic guidance and fatawa, reach out via the contact form</p>
          <button style={{ background: COLORS.gold, color: COLORS.darkGreen, border: "none", padding: "12px 32px", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2 }}>Ask a Question →</button>
        </div>
      </div>
    </div>
  );
}

function EventsPage() {
  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader title="Events & Programs" urdu="تقریبات و پروگرامز" sub="Upcoming lectures, khutbahs & gatherings" />

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {EVENTS.map((e, i) => (
            <div key={i} style={{
              background: COLORS.white, border: `1px solid ${COLORS.border}`, padding: "24px 28px",
              display: "flex", gap: 24, alignItems: "flex-start", borderRadius: 2,
              animation: `fadeUp 0.5s ease ${i * 0.1}s both`,
              borderLeft: `4px solid ${e.recurring ? COLORS.gold : COLORS.green}`,
            }}>
              <div style={{ background: e.recurring ? `${COLORS.gold}22` : `${COLORS.green}22`, padding: "8px 14px", borderRadius: 2, textAlign: "center", flexShrink: 0 }}>
                <div style={{ fontSize: 11, color: COLORS.textLight, textTransform: "uppercase", letterSpacing: "0.08em" }}>{e.recurring ? "Recurring" : "One-Time"}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: e.recurring ? COLORS.gold : COLORS.green, marginTop: 2 }}>{e.date}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.darkGreen, marginBottom: 4 }}>{e.title}</div>
                <span style={{ background: `${COLORS.green}22`, color: COLORS.green, padding: "2px 10px", fontSize: 11, borderRadius: 2 }}>{e.type}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Khutbah highlight */}
        <div style={{ marginTop: 40, background: `linear-gradient(135deg,${COLORS.darkGreen},${COLORS.green})`, padding: "36px", borderRadius: 2, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🕌</div>
          <div style={{ fontFamily: "'Amiri', serif", fontSize: 24, color: COLORS.goldLight, marginBottom: 8 }}>Friday Khutbah</div>
          <div className="urdu" style={{ fontSize: 18, color: "rgba(250,246,239,0.85)", marginBottom: 8 }}>مسجد المبارک لاہور</div>
          <p style={{ color: "rgba(250,246,239,0.7)", fontSize: 13 }}>Every Friday · Masjid Al-Mubarak, Lahore (Since 2009)</p>
        </div>
      </div>
    </div>
  );
}

function CommunityPage() {
  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionHeader title="Community" urdu="برادری" sub="Connect · Learn · Grow together in faith" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24, marginBottom: 48 }}>
          {[
            { icon: "📺", title: "Pegham TV", desc: "Official Islamic education channel. Weekly Tafseer Al-Quran broadcasts.", link: "#", color: COLORS.green },
            { icon: "🎥", title: "YouTube Channel", desc: "Full lectures, short clips, and live programs available on demand.", link: "#", color: "#FF0000" },
            { icon: "💬", title: "WhatsApp Community", desc: "Daily Islamic reminders, announcements, and Q&A updates.", link: "#", color: "#25D366" },
            { icon: "📘", title: "Facebook Page", desc: "Connect with thousands of followers and share Islamic knowledge.", link: "#", color: "#1877F2" },
            { icon: "🏛️", title: "Faith Welfare Foundation", desc: "Social and educational welfare initiatives in Pakistan (Est. 2024).", link: "#", color: COLORS.gold },
            { icon: "📧", title: "Newsletter", desc: "Receive new lectures, articles, and event announcements by email.", link: "#", color: COLORS.darkGreen },
          ].map((c, i) => (
            <div key={c.title} style={{
              background: COLORS.white, border: `1px solid ${COLORS.border}`, padding: "28px 24px",
              borderRadius: 2, textAlign: "center", animation: `fadeUp 0.5s ease ${i * 0.08}s both`,
              borderTop: `4px solid ${c.color}`,
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>{c.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.darkGreen, marginBottom: 8 }}>{c.title}</div>
              <p style={{ fontSize: 13, color: COLORS.textLight, lineHeight: 1.6, marginBottom: 16 }}>{c.desc}</p>
              <button style={{ background: c.color, color: COLORS.cream, border: "none", padding: "8px 20px", fontSize: 12, cursor: "pointer", borderRadius: 2, fontWeight: 600 }}>Join →</button>
            </div>
          ))}
        </div>

        {/* Ahlul Hadith section */}
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

function BiographyPage() {
  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <SectionHeader title="Biography" urdu="سوانح حیات" />

        {/* Header card */}
        <div style={{ background: `linear-gradient(135deg,${COLORS.darkGreen},${COLORS.green})`, padding: "40px", borderRadius: 2, marginBottom: 40, color: COLORS.cream }}>
          <h2 style={{ fontFamily: "'Amiri', serif", fontSize: 32, color: COLORS.goldLight, marginBottom: 8 }}>Dr. Muhammad Hammad Lakhvi</h2>
          <div className="urdu" style={{ fontSize: 18, color: "rgba(250,246,239,0.85)", marginBottom: 16 }}>پروفیسر ڈاکٹر محمد حماد لکھوی حفظہ اللہ</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {["Born: 9 September 1965, Dipalpur", "Post-Doctorate, University of Glasgow, UK", "Ph.D. Islamic Studies, Punjab University", "LLB Law, Punjab University"].map(b => (
              <span key={b} style={{ background: "rgba(184,151,42,0.2)", border: `1px solid ${COLORS.gold}`, color: COLORS.goldLight, padding: "4px 12px", fontSize: 12, borderRadius: 2 }}>{b}</span>
            ))}
          </div>
        </div>

        {[
          {
            title: "Family Heritage", urdu: "خاندانی پس منظر", icon: "🌳",
            content: "Dr. Lakhvi belongs to the renowned Lakhvi family of the Indian subcontinent — a scholarly dynasty with over 300 years of service to Islamic education and propagation. His lineage traces back to Hazrat Ali (RA) through Imam Muhammad ibn Hanafiyyah. His ancestors include prominent scholars who were students of Mian Nazeer Hussain Dehlvi and authored over 30 books in Punjabi verse, including the celebrated 'Ahwal al-Akhirah' and 'Tafseer Muhammadi'. His grandfather taught Hadith at Masjid Nabawi in Madinah."
          },
          {
            title: "Education", urdu: "تعلیمی مراحل", icon: "🎓",
            content: "His education spans from traditional Islamic sciences to Western academic institutions. He completed Matric (1982), FSc (1984), BA (1986), MA Islamiyat with Gold Medal — 1st Position (1988), MA Arabic (1990), Ph.D. (2001) on 'Islamic Concept of Individual Freedom', LLB Law (2008), and Post-Doctorate from the University of Glasgow, Scotland, UK (2007) on a Government of Pakistan scholarship."
          },
          {
            title: "Academic Career", urdu: "تدریسی مراحل", icon: "🏛️",
            content: "He served as Lecturer at Government College Toba Tek Singh (1990), then Government College Okara (1991). From 1996 he joined the Institute of Islamic Studies, University of the Punjab as Lecturer, progressing through Assistant Professor (2005), Associate Professor (2010), Professor (2014), Director (2024), and Dean (2019–2025). He retired on 8 December 2025 after 35 years of distinguished academic service."
          },
          {
            title: "Religious Service", urdu: "دینی خدمات", icon: "🕌",
            content: "Since 2009, Dr. Lakhvi leads Friday Khutbah and Imamat at Masjid Al-Mubarak, Lahore. He has been Vice Chairman of Pegham TV since 2018 and delivers weekly Tafseer Al-Quran broadcasts reaching audiences worldwide. He has served as a religious expert on PTV, Geo News, Dunya News, Peace TV, ATV, and other channels. He has traveled internationally numerous times for tableegh and delivered keynotes at 17+ international Islamic conferences."
          },
        ].map((s, i) => (
          <div key={s.title} style={{ marginBottom: 32, background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, overflow: "hidden", animation: `fadeUp 0.6s ease ${i * 0.1}s both` }}>
            <div style={{ background: `${COLORS.green}11`, padding: "16px 24px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontSize: 24 }}>{s.icon}</span>
              <div>
                <h3 style={{ fontFamily: "'Amiri', serif", fontSize: 20, color: COLORS.darkGreen }}>{s.title}</h3>
                <div className="urdu" style={{ fontSize: 14, color: COLORS.gold }}>{s.urdu}</div>
              </div>
            </div>
            <div style={{ padding: "24px" }}>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: COLORS.text }}>{s.content}</p>
            </div>
          </div>
        ))}

        {/* Awards */}
        <div style={{ background: `${COLORS.gold}11`, border: `2px solid ${COLORS.gold}`, padding: "28px", borderRadius: 2, textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🥇</div>
          <div style={{ fontFamily: "'Amiri', serif", fontSize: 22, color: COLORS.darkGreen, marginBottom: 8 }}>Gold Medal — Punjab University</div>
          <p style={{ color: COLORS.textLight, fontSize: 14 }}>1st Position in MA Islamic Studies · University of the Punjab, Lahore</p>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) setSent(true);
  };

  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader title="Contact" urdu="رابطہ" sub="Get in touch for lectures, fatawa, or media" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, flexWrap: "wrap" }}>
          {/* Contact info */}
          <div>
            <h3 style={{ fontFamily: "'Amiri', serif", fontSize: 22, color: COLORS.darkGreen, marginBottom: 24 }}>Contact Information</h3>
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

            <div style={{ marginTop: 32, padding: "20px", background: COLORS.darkGreen, borderRadius: 2 }}>
              <div className="urdu" style={{ fontSize: 18, color: COLORS.goldLight, marginBottom: 8 }}>فیتھ ویلفیئر فاؤنڈیشن</div>
              <p style={{ color: "rgba(250,246,239,0.7)", fontSize: 12, lineHeight: 1.7 }}>For institutional inquiries, invitations to conferences, and media appearances, please use the contact form.</p>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div style={{ textAlign: "center", padding: "60px 20px", animation: "fadeIn 0.5s ease" }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
                <div style={{ fontFamily: "'Amiri', serif", fontSize: 24, color: COLORS.darkGreen, marginBottom: 8 }}>Message Sent!</div>
                <p style={{ color: COLORS.textLight, fontSize: 14 }}>JazakAllahu Khayran. We will respond as soon as possible.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { key: "name", label: "Your Name", type: "text", placeholder: "Muhammad Ali" },
                  { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                  { key: "subject", label: "Subject", type: "text", placeholder: "Question about..." },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: COLORS.textLight, marginBottom: 6 }}>{f.label}</label>
                    <input
                      type={f.type} placeholder={f.placeholder} value={form[f.key]}
                      onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      style={{ width: "100%", padding: "12px 16px", border: `1px solid ${COLORS.border}`, borderRadius: 2, fontSize: 14, fontFamily: "'Libre Baskerville', serif", background: COLORS.white, outline: "none", color: COLORS.text }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: COLORS.textLight, marginBottom: 6 }}>Message</label>
                  <textarea
                    placeholder="Your question or message..." rows={5} value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    style={{ width: "100%", padding: "12px 16px", border: `1px solid ${COLORS.border}`, borderRadius: 2, fontSize: 14, fontFamily: "'Libre Baskerville', serif", background: COLORS.white, outline: "none", resize: "vertical", color: COLORS.text }}
                  />
                </div>
                <button onClick={handleSubmit} style={{
                  background: `linear-gradient(135deg,${COLORS.darkGreen},${COLORS.green})`, color: COLORS.cream,
                  border: "none", padding: "14px 32px", fontSize: 13, letterSpacing: "0.1em",
                  textTransform: "uppercase", cursor: "pointer", borderRadius: 2, fontWeight: 700, fontFamily: "'Libre Baskerville', serif",
                }}>Send Message →</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer({ setActive }) {
  return (
    <footer style={{ background: COLORS.charcoal, padding: "60px 24px 24px", color: "rgba(250,246,239,0.7)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: "'Amiri', serif", fontSize: 20, color: COLORS.goldLight, marginBottom: 8 }}>Dr. Muhammad Hammad Lakhvi</div>
            <div className="urdu" style={{ fontSize: 14, color: "rgba(250,246,239,0.5)", lineHeight: 2 }}>سابق ڈین، ادارہ علوم اسلامیہ، جامعہ پنجاب</div>
          </div>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: COLORS.gold, marginBottom: 16 }}>Quick Links</div>
            {NAV_ITEMS.map(n => (
              <button key={n.id} onClick={() => setActive(n.id)} style={{ display: "block", background: "none", border: "none", cursor: "pointer", color: "rgba(250,246,239,0.6)", fontSize: 13, padding: "4px 0", fontFamily: "'Libre Baskerville', serif", textAlign: "left" }}>{n.label}</button>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: COLORS.gold, marginBottom: 16 }}>Organizations</div>
            {["Markazi Jamiat Ahlul Hadith", "Pegham TV", "Faith Welfare Foundation", "Punjab Quran Board"].map(o => (
              <div key={o} style={{ fontSize: 13, padding: "4px 0", color: "rgba(250,246,239,0.6)" }}>— {o}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: COLORS.gold, marginBottom: 16 }}>Qualifications</div>
            {["Post-Doctorate, Glasgow UK", "Ph.D. Islamic Studies", "LLB Law", "MA Islamiyat — Gold Medal", "MA Arabic"].map(q => (
              <div key={q} style={{ fontSize: 12, padding: "4px 0", color: "rgba(250,246,239,0.6)" }}>✦ {q}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: `1px solid rgba(184,151,42,0.2)`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div className="urdu" style={{ fontSize: 14, color: "rgba(250,246,239,0.4)" }}>بسم اللہ الرحمن الرحیم</div>
          <div style={{ fontSize: 12, color: "rgba(250,246,239,0.4)" }}>© 2026 Dr. Muhammad Hammad Lakhvi · All rights reserved</div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("home");

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [active]);

  const pages = {
    home: <HomePage setActive={setActive} />,
    biography: <BiographyPage />,
    shorts: <ShortsPage />,
    lectures: <LecturesPage />,
    articles: <ArticlesPage />,
    fatwa: <FatwaPage />,
    events: <EventsPage />,
    community: <CommunityPage />,
    contact: <ContactPage />,
  };

  return (
    <>
      <style>{fonts + globalStyle}</style>
      <NavBar active={active} setActive={setActive} />
      <main style={{ paddingTop: active === "home" ? 0 : 0 }}>
        {pages[active] || pages.home}
      </main>
      <Footer setActive={setActive} />
    </>
  );
}
