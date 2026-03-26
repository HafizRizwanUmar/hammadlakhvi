import { COLORS } from "../constants";
import { SectionHeader } from "../components/UI";
import { TV_PROGRAMS_DATA } from "../data/videos";

export default function CommunityPage({ onProgramClick }) {
  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionHeader title="Community" urdu="برادری" sub="Connect · Learn · Grow together in faith" />

        {/* Connect cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 24, marginBottom: 48 }}>
          {[
            { icon: "📺", title: "Pegham TV", desc: "Official Islamic education channel. Weekly Tafseer Al-Quran broadcasts.", color: COLORS.green, href: null },
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

        {/* Payam-e-Subah section */}
        <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, padding: "36px", marginBottom: 36 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
            <div style={{ width: 80, height: 80, background: COLORS.darkGreen, borderRadius: 4, overflow: "hidden", flexShrink: 0 }}>
              <img src="/payam2019.jpeg" alt="Payam-e-Subah" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div>
              <div className="urdu" style={{ fontSize: 22, color: COLORS.darkGreen, fontWeight: 700, lineHeight: 2 }}>پیام صبح — دنیا نیوز</div>
              <div style={{ fontSize: 14, color: COLORS.textLight }}>Payam-e-Subah · Dunya News · Annual Programs 2019–2022</div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: COLORS.textLight, lineHeight: 1.8, marginBottom: 24 }}>
            Dr. Lakhvi's annual Payam-e-Subah morning programs on Dunya News — a beloved tradition of Islamic guidance. Browse all years and episodes.
          </p>
          <button
            onClick={() => onProgramClick("payam-e-subah")}
            style={{ background: `linear-gradient(135deg,${COLORS.darkGreen},${COLORS.green})`, color: COLORS.cream, border: "none", padding: "12px 28px", borderRadius: 2, fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: "0.08em" }}
          >
            🌅 Browse Payam-e-Subah Series →
          </button>
        </div>

        {/* TV Programs grid */}
        <div style={{ marginBottom: 36 }}>
          <h3 style={{ fontFamily: "'Amiri',serif", fontSize: 22, color: COLORS.darkGreen, marginBottom: 20, paddingBottom: 10, borderBottom: `2px solid ${COLORS.border}` }}>
            📺 TV Programs — Watch Videos
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 18 }}>
            {TV_PROGRAMS_DATA.map((p, i) => (
              <div key={p.id} className="tv-program-card" onClick={() => onProgramClick(p.slug || p.id)}
                style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, padding: "22px 20px", borderRadius: 2, borderTop: `3px solid ${p.channelColor}`, cursor: "pointer", animation: `fadeUp 0.5s ease ${i * 0.07}s both` }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  {p.thumbnail ? (
                    <img src={p.thumbnail} alt={p.name} style={{ width: 44, height: 44, borderRadius: 2, objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontSize: 28 }}>{p.icon}</span>
                  )}
                  <div style={{ flex: 1 }}>
                    <div className="urdu" style={{ fontSize: 16, color: COLORS.darkGreen, fontWeight: 700, lineHeight: 2 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: COLORS.textLight, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{p.channel}</div>
                    <div style={{ color: p.channelColor, fontSize: 12, fontWeight: 700 }}>
                      {p.useYearlyFormat ? "Browse Years →" : "Watch Videos →"}
                    </div>
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
