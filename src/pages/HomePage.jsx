// HomePage.jsx
import { useNavigate } from "react-router-dom";
import { COLORS, NAV_ITEMS } from "../constants";
import { SectionHeader } from "../components/UI";
import { TV_PROGRAMS_DATA } from "../data/videos";

function FeaturedTVPrograms() {
  const navigate = useNavigate();
  return (
    <section style={{ padding: "80px 24px", background: COLORS.cream }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader title="Featured TV Programs" urdu="مشہور ٹی وی پروگرامز" sub="Click any program to watch videos" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
          {TV_PROGRAMS_DATA.map((p, i) => (
            <div key={p.id} className="tv-program-card" onClick={() => navigate(`/tv/${p.slug || p.id}`)}
              style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, padding: "28px 20px", textAlign: "center", borderRadius: 2, borderTop: `4px solid ${p.channelColor}`, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}>
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

export default function HomePage() {
  const navigate = useNavigate();

  const getPath = (id) => NAV_ITEMS.find(n => n.id === id)?.path || "/";

  return (
    <div>
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", background: `linear-gradient(160deg,${COLORS.darkGreen} 0%,${COLORS.green} 60%,#1a4a30 100%)`, position: "relative", overflow: "hidden", paddingTop: 64 }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="hero-layout" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 56px", width: "100%", display: "flex", alignItems: "center", gap: 72, position: "relative", animation: "fadeUp 0.9s ease" }}>
          <div style={{ flexShrink: 0, display: "flex", justifyContent: "center" }}>
            <div className="hero-pic" style={{ width: 300, height: 370, borderRadius: 16, border: `5px solid ${COLORS.goldLight}`, animation: "glowPulse 3s ease-in-out infinite", position: "relative", overflow: "hidden", background: COLORS.darkGreen }}>
              <img src="/profile.jpg" alt="Dr. Muhammad Hammad Lakhvi" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:${COLORS.darkGreen}"><div style="font-size:80px">👤</div></div>`; }} />
            </div>
          </div>
          <div className="hero-text" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0 }}>
            <div style={{ fontSize: 36, marginBottom: 10, animation: "shimmer 3s infinite" }}>☽</div>
            <div style={{ fontFamily: "'Noto Nastaliq Urdu',serif", fontSize: "clamp(15px,2.2vw,22px)", color: COLORS.goldLight, marginBottom: 16, direction: "rtl", lineHeight: 2, width: "100%", textAlign: "right" }}>بسم اللّٰہ الرحمن الرحیم</div>
            <h1 style={{ fontFamily: "'Amiri',serif", fontSize: "clamp(30px,4.5vw,62px)", color: COLORS.cream, fontWeight: 700, lineHeight: 1.1, marginBottom: 8 }}>Dr. Muhammad<br />Hammad Lakhvi</h1>
            <div className="urdu" style={{ fontSize: "clamp(14px,1.8vw,20px)", color: COLORS.goldLight, marginBottom: 14, lineHeight: 2 }}>پروفیسر ڈاکٹر محمد حماد لکھوی حفظہ اللّٰہ</div>
            <div style={{ width: 80, height: 2, background: COLORS.gold, marginBottom: 18 }} />
            <div className="urdu" style={{ fontSize: 13, color: "rgba(250,246,239,0.9)", marginBottom: 10, lineHeight: 1.8, textAlign: "right", width: "100%" }}>
                • صدر فیتھ فاؤنڈیشن &nbsp; • سابق ڈین کلیہ علوم اسلامیہ جامعہ پنجاب
            </div>
            <p style={{ fontFamily: "'Libre Baskerville',serif", fontSize: "clamp(11px,1.3vw,14px)", color: "rgba(250,246,239,0.75)", marginBottom: 12, lineHeight: 1.6 }}>
                President Faith Foundation · Former Dean, Faculty of Islamic Studies
            </p>
            <div className="hero-creds" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
              {["Post-Doc — Glasgow UK", "Ph.D. Islamic Studies", "LLB Law", "MA Islamiyat — Gold Medal"].map(c => (
                <span key={c} style={{ background: "rgba(184,151,42,0.18)", border: `1px solid ${COLORS.gold}`, color: COLORS.goldLight, padding: "5px 13px", borderRadius: 2, fontSize: 11, letterSpacing: "0.04em", fontFamily: "'Libre Baskerville',serif" }}>{c}</span>
              ))}
            </div>
            <div className="hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[["Watch Lectures", "lectures", true], ["Read Articles", "articles", false], ["Biography", "biography", false], ["Contact", "contact", false]].map(([label, id, primary]) => (
                <button key={id} onClick={() => navigate(getPath(id))} style={{ background: primary ? `linear-gradient(135deg,${COLORS.gold},${COLORS.goldLight})` : "transparent", border: `2px solid ${COLORS.gold}`, color: primary ? COLORS.darkGreen : COLORS.cream, padding: "12px 26px", fontSize: 13, fontFamily: "'Libre Baskerville',serif", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2, fontWeight: primary ? 700 : 400 }}>{label}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: COLORS.darkGreen, padding: "40px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 28, textAlign: "center" }}>
          {[["35+", "Years Teaching"], ["47+", "Research Papers"], ["17+", "Int'l Conferences"], ["10+", "TV Programs"], ["2009", "Masjid Al-Mubarak"], ["300+", "Family Legacy (Yrs)"]].map(([n, l]) => (
            <div key={l}><div style={{ fontFamily: "'Amiri',serif", fontSize: 38, color: COLORS.goldLight, fontWeight: 700 }}>{n}</div><div style={{ fontSize: 10, color: "rgba(250,246,239,0.7)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>{l}</div></div>
          ))}
        </div>
      </section>

      <FeaturedTVPrograms />
    </div>
  );
}
