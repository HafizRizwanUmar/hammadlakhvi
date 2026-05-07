import { useState, useEffect } from "react";
import axios from "axios";
import { COLORS, API_BASE } from "../constants";
import { SectionHeader, BackBtn, YouTubeEmbed } from "../components/UI";

function EventDetailPage({ event, onBack }) {
  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <BackBtn onClick={onBack} label="← Back to Events" />
        <div style={{ background: `linear-gradient(135deg,${COLORS.darkGreen},${COLORS.green})`, borderRadius: 2, padding: "clamp(28px,5vw,48px) clamp(20px,5vw,40px)", marginBottom: 36, borderLeft: `6px solid ${event.color || COLORS.gold}`, animation: "fadeUp 0.5s ease" }}>
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

        {/* Gallery Section */}
          <div style={{ marginBottom: 40 }}>
            <h3 style={{ fontFamily: "'Amiri',serif", fontSize: 24, color: COLORS.darkGreen, marginBottom: 24, borderBottom: `2px solid ${COLORS.gold}`, paddingBottom: 12, display: 'inline-block' }}>Event Gallery</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {event.gallery.map((day, dIdx) => (
                <div key={dIdx}>
                  {event.galleryMode !== 'GALLERY' && (
                    <h4 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.1em', color: COLORS.gold, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 24, height: 1, background: COLORS.gold }}></span>
                      {day.label}
                    </h4>
                  )}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
                    {day.images.map((img, iIdx) => {
                      const url = typeof img === 'string' ? img : img.url;
                      const title = typeof img === 'string' ? '' : img.title;
                      return (
                        <div key={iIdx} style={{ borderRadius: 4, overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", background: COLORS.white, display: 'flex', flexDirection: 'column' }}>
                          <div style={{ aspectRatio: "4/3", overflow: 'hidden' }}>
                            <img src={url} alt={title || `Gallery ${iIdx}`} style={{ width: "100%", height: "100%", objectFit: "cover", transition: 'transform 0.3s ease' }} 
                                 onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} 
                                 onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                          </div>
                          {title && (
                            <div style={{ padding: '10px 12px', fontSize: 12, color: COLORS.darkGreen, fontWeight: 700, borderTop: `1px solid ${COLORS.border}`, background: COLORS.cream }}>
                              {title}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

        {event.details && event.details.length > 0 && (
          <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, padding: "28px", marginBottom: 24 }}>
            <h3 style={{ fontFamily: "'Amiri',serif", fontSize: 20, color: COLORS.darkGreen, marginBottom: 18 }}>Event Details</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {event.details.map((d, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 16px", background: COLORS.cream, borderRadius: 2, borderLeft: `3px solid ${event.color || COLORS.gold}` }}>
                  <span style={{ color: COLORS.gold, fontSize: 16, flexShrink: 0 }}>✦</span>
                  <span style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.6 }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/events`).then(res => {
      setEvents(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading events...</div>;
  if (selectedEvent) return <EventDetailPage event={selectedEvent} onBack={() => setSelectedEvent(null)} />;

  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader title="Events & Programs" urdu="تقریبات و پروگرامز" sub="Click any event to view full details and galleries" />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {events.map((e, i) => (
            <div key={e._id} className="event-card" onClick={() => setSelectedEvent(e)}
              style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, padding: "24px 28px", display: "flex", gap: 20, alignItems: "flex-start", borderRadius: 2, animation: `fadeUp 0.5s ease ${i * 0.1}s both`, borderLeft: `5px solid ${e.color || COLORS.gold}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
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
          {events.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', color: COLORS.textLight }} className="card">No events have been posted yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
