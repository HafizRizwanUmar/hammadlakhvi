import { useState } from "react";
import { COLORS } from "../constants";
import { SectionHeader, BackBtn, YouTubeEmbed } from "../components/UI";

const EVENTS_DATA = [
  { id: "retirement", date: "December 2025", title: "Retirement Gatherings — Dr. Muhammad Hammad Lakhvi", type: "Special", recurring: false, icon: "📜", location: "Various Locations, Lahore", description: "Over the days surrounding his retirement, students, colleagues, alumni, friends, and well-wishers arranged different gatherings to express their respect, love, and gratitude.", details: ["Farewell ceremonies and academic tributes", "Heartfelt moments in the mosque and warm dinners", "Remembrance of affection, prayers, and honour", "Compilation of cherished moments"], videoId: "CwISoX32rE0", color: "#B19025" },
  { id: "ev1", date: "Every Friday", title: "Friday Khutbah — Masjid Al-Mubarak Lahore", type: "Regular", recurring: true, icon: "🕌", location: "Masjid Al-Mubarak, Lahore", description: "Dr. Lakhvi has been delivering the Friday Khutbah and leading Jumu'ah prayers at Masjid Al-Mubarak, Lahore since 2009.", details: ["Weekly Friday Khutbah since 2009", "Covers Quranic themes and contemporary issues", "Open to all Muslims — brothers and sisters welcome", "Masjid Al-Mubarak, Lahore"], color: COLORS.gold },
  { id: "ev2", date: "Every Saturday", title: "Weekly Tafseer Al-Quran — Pegham TV Live", type: "TV Program", recurring: true, icon: "📺", location: "Pegham TV Studio, Lahore / Online", description: "Since 2015, Dr. Lakhvi has been delivering a weekly Tafseer Al-Quran program on Pegham TV.", details: ["Weekly broadcast since 2015 on Pegham TV", "Live and available on YouTube & Facebook", "Verse-by-verse Quranic exegesis", "Millions of viewers worldwide"], color: COLORS.green },
  { id: "ev3", date: "5 April 2026", title: "International Islamic Studies Conference — Islamabad", type: "Conference", recurring: false, icon: "🎓", location: "Islamabad, Pakistan", description: "Dr. Lakhvi will present a research paper at this international conference.", details: ["International scholars from 20+ countries", "Research paper presentation by Dr. Lakhvi", "Themes: Contemporary Islamic Jurisprudence", "Venue: Islamabad Convention Centre"], color: COLORS.darkGreen },
  { id: "ev4", date: "12 April 2026", title: "Faith Welfare Foundation Annual Gathering", type: "Community", recurring: false, icon: "🤝", location: "Lahore, Pakistan", description: "The annual gathering of Faith Welfare Foundation, founded by Dr. Lakhvi in 2024.", details: ["Annual gathering of Faith Welfare Foundation", "Founded by Dr. Lakhvi — Est. 2024", "Social & educational welfare programs", "Community recognition and award ceremony"], color: "#8B6914" },
  { id: "ev5", date: "Every Saturday", title: "Online Tafseer Halqa — Zoom", type: "Online", recurring: true, icon: "💻", location: "Online (Zoom)", description: "An interactive online Tafseer circle open to students and seekers of Islamic knowledge worldwide.", details: ["Open to all students of Islamic knowledge", "Interactive Q&A format", "Register via the contact form", "Available globally via Zoom"], color: COLORS.greenLight },
];

function EventDetailPage({ event, onBack }) {
  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <BackBtn onClick={onBack} label="← Back to Events" />
        <div style={{ background: `linear-gradient(135deg,${COLORS.darkGreen},${COLORS.green})`, borderRadius: 2, padding: "clamp(28px,5vw,48px) clamp(20px,5vw,40px)", marginBottom: 36, borderLeft: `6px solid ${event.color}`, animation: "fadeUp 0.5s ease" }}>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ fontSize: 56, flexShrink: 0 }}>{event.icon}</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
                <span style={{ background: "rgba(184,151,42,0.25)", border: `1px solid ${COLORS.gold}`, color: COLORS.goldLight, padding: "4px 14px", fontSize: 11, borderRadius: 2 }}>{event.type}</span>
                {event.recurring && <span style={{ background: "rgba(255,255,255,0.1)", color: "rgba(250,246,239,0.7)", padding: "4px 14px", fontSize: 11, borderRadius: 2 }}>🔄 Recurring</span>}
              </div>
              <h2 style={{ fontFamily: "'Amiri',serif", fontSize: "clamp(18px,3vw,30px)", color: COLORS.cream, fontWeight: 700, lineHeight: 1.3, marginBottom: 12 }}>{event.title}</h2>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 16 }}>
                <span style={{ color: COLORS.goldLight, fontSize: 14 }}>📅 {event.date}</span>
                <span style={{ color: "rgba(250,246,239,0.7)", fontSize: 14 }}>📍 {event.location}</span>
              </div>
              <p style={{ color: "rgba(250,246,239,0.85)", fontSize: 14, lineHeight: 1.9 }}>{event.description}</p>
            </div>
          </div>
        </div>
        {event.videoId && (
          <div style={{ marginBottom: 40, borderRadius: 2, overflow: "hidden", boxShadow: "0 12px 32px rgba(0,0,0,0.15)" }}>
            <YouTubeEmbed videoId={event.videoId} title={event.title} />
          </div>
        )}
        <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, padding: "28px", marginBottom: 24 }}>
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
    </div>
  );
}

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  if (selectedEvent) return <EventDetailPage event={selectedEvent} onBack={() => setSelectedEvent(null)} />;

  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader title="Events & Programs" urdu="تقریبات و پروگرامز" sub="Click any event to view full details" />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {EVENTS_DATA.map((e, i) => (
            <div key={e.id} className="event-card" onClick={() => setSelectedEvent(e)}
              style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, padding: "24px 28px", display: "flex", gap: 20, alignItems: "flex-start", borderRadius: 2, animation: `fadeUp 0.5s ease ${i * 0.1}s both`, borderLeft: `5px solid ${e.color}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 36, flexShrink: 0 }}>{e.icon}</div>
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
              <div style={{ flexShrink: 0, color: COLORS.gold, fontSize: 20, alignSelf: "center" }}>→</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
