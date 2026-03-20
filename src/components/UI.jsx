import { useState } from "react";
import { COLORS } from "../constants";

export function ArabicOrnament() {
  return <div style={{ textAlign: "center", color: COLORS.gold, fontSize: 28, opacity: 0.6, letterSpacing: 8, margin: "8px 0" }}>❧ ✦ ❧</div>;
}

export function SectionHeader({ title, urdu, sub }) {
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

export function BackBtn({ onClick, label = "← Back" }) {
  return (
    <button onClick={onClick} style={{ background: "none", border: `1px solid ${COLORS.border}`, cursor: "pointer", padding: "10px 20px", borderRadius: 2, display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Libre Baskerville',serif", fontSize: 13, color: COLORS.text, marginBottom: 36, transition: "all 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.background = COLORS.darkGreen; e.currentTarget.style.color = COLORS.cream; }}
      onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = COLORS.text; }}>
      {label}
    </button>
  );
}

export function YouTubeEmbed({ videoId, title }) {
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

export function VideoCard({ video, onClick, style = {} }) {
  return (
    <div onClick={() => onClick(video)}
      style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, overflow: "hidden", cursor: "pointer", transition: "all 0.2s", ...style }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
      <div style={{ position: "relative", paddingBottom: "56.25%", background: COLORS.charcoal, overflow: "hidden" }}>
        <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt={video.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.2)" }}>
          <div style={{ width: 50, height: 50, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}>
            <span style={{ color: "#fff", fontSize: 18, marginLeft: 3 }}>▶</span>
          </div>
        </div>
      </div>
      <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
        {video.ep && <span style={{ background: `${COLORS.gold}22`, color: COLORS.gold, padding: "3px 10px", fontSize: 11, borderRadius: 2, flexShrink: 0 }}>{video.ep}</span>}
        <div className="urdu" style={{ fontSize: 15, color: COLORS.darkGreen, fontWeight: 600 }}>{video.title}</div>
      </div>
    </div>
  );
}

export function VideoModal({ video, onClose }) {
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

export function WhatsAppButton() {
  const whatsappNumber = "+923079797519";
  return (
    <a href={`https://wa.me/${whatsappNumber.replace(/\+/g, "")}`} target="_blank" rel="noreferrer"
      style={{ position: "fixed", bottom: 30, right: 30, zIndex: 1100, width: 60, height: 60, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", transition: "all 0.3s", cursor: "pointer" }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1) translateY(-5px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1) translateY(0)"}>
      <svg width="34" height="34" viewBox="0 0 24 24" fill="white">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.316 1.592 5.43 0 9.856-4.426 9.858-9.855.002-5.43-4.425-9.856-9.853-9.856-5.431 0-9.856 4.426-9.858 9.855.001 1.938.549 3.791 1.587 5.399l-.995 3.635 3.745-.969zm11.381-6.83c-.312-.156-1.848-.912-2.134-1.017-.286-.105-.495-.156-.704.156-.21.312-.801 1.017-1.006 1.25-.204.234-.411.261-.724.105-.312-.156-1.32-.486-2.515-1.551-.929-.828-1.555-1.851-1.737-2.163-.182-.312-.019-.481.137-.635.141-.138.312-.365.469-.547.156-.182.209-.312.313-.52.104-.21.052-.39-.026-.547-.078-.156-.704-1.7-.965-2.33-.254-.614-.512-.53-.704-.54-.182-.008-.391-.01-.6-.01s-.547.078-.833.39c-.286.312-1.094 1.068-1.094 2.604s1.12 3.021 1.276 3.23c.156.21 2.204 3.366 5.338 4.72.744.322 1.325.515 1.777.659.746.237 1.425.203 1.962.123.599-.088 1.848-.755 2.108-1.485.26-.73.26-1.354.182-1.485-.078-.13-.286-.208-.598-.364z" />
      </svg>
    </a>
  );
}
