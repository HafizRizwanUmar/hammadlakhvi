import { useState } from "react";
import { COLORS } from "../constants";
import { PAYAM_SUBAH_YEARS } from "../data/videos";
import { BackBtn, SectionHeader } from "../components/UI";

// Groups episodes by month
function groupByMonth(episodes) {
  const groups = {};
  episodes.forEach(ep => {
    if (!groups[ep.month]) groups[ep.month] = [];
    groups[ep.month].push(ep);
  });
  return groups;
}

// Single episode card
function EpisodeCard({ ep, onVideoClick }) {
  return (
    <div style={{
      background: COLORS.white,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 4,
      overflow: "hidden",
      borderLeft: `4px solid ${COLORS.gold}`,
      animation: "fadeUp 0.4s ease both",
    }}>
      {/* YouTube embed if available */}
      {ep.youtubeId && (
        <div
          onClick={() => onVideoClick({ id: ep.youtubeId, title: ep.topic, ep: ep.date })}
          style={{ position: "relative", paddingBottom: "56.25%", background: "#000", cursor: "pointer", overflow: "hidden" }}
        >
          <img
            src={`https://img.youtube.com/vi/${ep.youtubeId}/hqdefault.jpg`}
            alt={ep.topic}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.25)" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: COLORS.gold, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}>
              <span style={{ color: "#fff", fontSize: 16, marginLeft: 3 }}>▶</span>
            </div>
          </div>
        </div>
      )}

      <div style={{ padding: "14px 16px" }}>
        {/* Date badge */}
        <div style={{ fontSize: 11, color: COLORS.textLight, letterSpacing: "0.08em", marginBottom: 8 }}>
          📅 {ep.date}
        </div>

        {/* Topic */}
        <div className="urdu" style={{ fontSize: 17, color: COLORS.darkGreen, fontWeight: 700, lineHeight: 2, marginBottom: 10 }}>
          {ep.topic}
        </div>

        {/* Action links */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {ep.youtubeId && (
            <button
              onClick={() => onVideoClick({ id: ep.youtubeId, title: ep.topic, ep: ep.date })}
              style={{ background: "#FF0000", color: "#fff", border: "none", padding: "6px 14px", borderRadius: 2, fontSize: 11, cursor: "pointer", fontWeight: 600, letterSpacing: "0.06em" }}
            >
              ▶ YouTube
            </button>
          )}
          {ep.dunyanewsUrl && (
            <a
              href={ep.dunyanewsUrl}
              target="_blank"
              rel="noreferrer"
              style={{ background: COLORS.darkGreen, color: COLORS.cream, border: "none", padding: "6px 14px", borderRadius: 2, fontSize: 11, cursor: "pointer", fontWeight: 600, letterSpacing: "0.06em", textDecoration: "none" }}
            >
              📺 Dunya News
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Year detail page — shows all episodes organized by month
export function PayamYearPage({ yearData, onBack, onVideoClick }) {
  const monthGroups = groupByMonth(yearData.episodes);
  const months = Object.keys(monthGroups);
  const hasEpisodes = yearData.episodes.length > 0;

  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <BackBtn onClick={onBack} label="← Back to Payam-e-Subah" />

        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.darkGreen}, ${COLORS.green})`,
          borderRadius: 4,
          overflow: "hidden",
          marginBottom: 40,
          borderTop: `5px solid #C8102E`,
        }}>
          <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
            {/* Thumbnail */}
            <div style={{ width: 280, flexShrink: 0, background: "#000", position: "relative", minHeight: 180 }}>
              <img
                src={yearData.thumbnail}
                alt={`Payam-e-Subah ${yearData.year}`}
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", minHeight: 180 }}
                onError={e => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = `<div style="width:100%;height:180px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0a1a12;gap:8px"><div style="font-size:48px">🌅</div><div style="font-size:32px;font-family:'Noto Nastaliq Urdu',serif;color:#D4AF37;direction:rtl">${yearData.label}</div></div>`;
                }}
              />
            </div>

            {/* Info */}
            <div style={{ flex: 1, padding: "32px 36px", minWidth: 240 }}>
              <div style={{ fontSize: 11, color: "rgba(250,246,239,0.5)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 10 }}>
                Dunya News · Morning Program
              </div>
              <div className="urdu" style={{ fontSize: 32, color: COLORS.goldLight, lineHeight: 1.8, marginBottom: 4 }}>
                پیام صبح {yearData.label}
              </div>
              <div style={{ fontFamily: "'Amiri',serif", fontSize: 22, color: COLORS.cream, marginBottom: 16 }}>
                Payam-e-Subah {yearData.year}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
                <span style={{ background: "rgba(184,151,42,0.2)", border: `1px solid ${COLORS.gold}`, color: COLORS.goldLight, padding: "4px 12px", fontSize: 12, borderRadius: 2 }}>
                  🎤 Prof. Dr. Muhammad Hammad Lakhvi
                </span>
                {hasEpisodes && (
                  <span style={{ background: "rgba(255,255,255,0.1)", color: "rgba(250,246,239,0.8)", padding: "4px 12px", fontSize: 12, borderRadius: 2 }}>
                    {yearData.episodes.length} Episodes
                  </span>
                )}
              </div>
              {yearData.facebookUrl && (
                <a
                  href={yearData.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1877F2", color: "#fff", padding: "10px 20px", borderRadius: 2, textDecoration: "none", fontSize: 13, fontWeight: 700 }}
                >
                  📘 Watch Full Program on Facebook
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Episodes by month */}
        {hasEpisodes ? (
          months.map(month => (
            <div key={month} style={{ marginBottom: 40 }}>
              {/* Month divider */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <div style={{ background: COLORS.darkGreen, color: COLORS.goldLight, padding: "6px 18px", borderRadius: 2, fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", flexShrink: 0 }}>
                  {month}
                </div>
                <div style={{ flex: 1, height: 1, background: COLORS.border }} />
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 20,
              }}>
                {monthGroups[month].map((ep, i) => (
                  <EpisodeCard key={ep.date + i} ep={ep} onVideoClick={onVideoClick} />
                ))}
              </div>
            </div>
          ))
        ) : (
          /* No structured episodes — fallback to Facebook CTA */
          <div style={{ textAlign: "center", padding: "60px 24px", background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 4 }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🌅</div>
            <div className="urdu" style={{ fontSize: 22, color: COLORS.darkGreen, marginBottom: 8, lineHeight: 2 }}>
              پیام صبح {yearData.label}
            </div>
            <p style={{ color: COLORS.textLight, fontSize: 15, marginBottom: 24, lineHeight: 1.8 }}>
              Watch the full {yearData.year} Payam-e-Subah program collection on Facebook.
            </p>
            {yearData.facebookUrl && (
              <a
                href={yearData.facebookUrl}
                target="_blank"
                rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#1877F2", color: "#fff", padding: "14px 32px", borderRadius: 2, textDecoration: "none", fontSize: 15, fontWeight: 700 }}
              >
                📘 Watch on Facebook →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Main Payam-e-Subah index page — shows year cards
export default function PayamSubahPage({ onYearSelect, onBack }) {
  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <BackBtn onClick={onBack} label="← Back to TV Programs" />

        <SectionHeader
          title="Payam-e-Subah"
          urdu="پیام صبح — دنیا نیوز"
          sub="Yearly Morning Program Series · Select a Year to Explore"
        />

        {/* Channel badge */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ background: "#C8102E", color: "#fff", padding: "6px 20px", borderRadius: 2, fontSize: 13, fontWeight: 700, letterSpacing: "0.08em" }}>
            📺 Dunya News · Morning Transmission
          </span>
        </div>

        {/* Year cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 28,
        }}>
          {PAYAM_SUBAH_YEARS.map((yr, i) => (
            <div
              key={yr.year}
              className="payam-year-card"
              onClick={() => onYearSelect(yr.year)}
              style={{
                background: COLORS.white,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
                animation: `fadeUp 0.5s ease ${i * 0.1}s both`,
              }}
            >
              {/* Thumbnail */}
              <div style={{ position: "relative", paddingBottom: "60%", background: COLORS.darkGreen, overflow: "hidden" }}>
                <img
                  src={yr.thumbnail}
                  alt={`Payam-e-Subah ${yr.year}`}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
                  onError={e => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#1A3A2A,#2C5F3F);gap:8px"><div style="font-size:40px">🌅</div><div style="font-family:'Noto Nastaliq Urdu',serif;font-size:28px;color:#D4AF37;direction:rtl">${yr.label}</div></div>`;
                  }}
                />
                {/* Year overlay */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(26,58,42,0.95), transparent)", padding: "24px 16px 12px" }}>
                  <div className="urdu" style={{ fontSize: 26, color: COLORS.goldLight, fontWeight: 700, lineHeight: 1.4 }}>
                    {yr.label}
                  </div>
                </div>
                {/* Episode count badge */}
                {yr.episodes.length > 0 && (
                  <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(26,58,42,0.9)", border: `1px solid ${COLORS.gold}`, color: COLORS.goldLight, padding: "3px 10px", fontSize: 11, borderRadius: 2 }}>
                    {yr.episodes.length} Episodes
                  </div>
                )}
              </div>

              {/* Card body */}
              <div style={{ padding: "18px 20px" }}>
                <div style={{ fontFamily: "'Amiri',serif", fontSize: 22, color: COLORS.darkGreen, fontWeight: 700, marginBottom: 6 }}>
                  {yr.year}
                </div>
                <div className="urdu" style={{ fontSize: 14, color: COLORS.textLight, lineHeight: 2, marginBottom: 14 }}>
                  پیام صبح — دنیا نیوز
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 1, background: COLORS.darkGreen, color: COLORS.cream, padding: "8px 0", textAlign: "center", borderRadius: 2, fontSize: 12, fontWeight: 700, letterSpacing: "0.06em" }}>
                    Browse Episodes →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info box */}
        <div style={{ marginTop: 48, padding: "28px 32px", background: COLORS.darkGreen, borderRadius: 4, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ fontSize: 36 }}>🌅</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Amiri',serif", fontSize: 20, color: COLORS.goldLight, marginBottom: 6 }}>
              About Payam-e-Subah
            </div>
            <p style={{ color: "rgba(250,246,239,0.75)", fontSize: 13, lineHeight: 1.8 }}>
              Morning spiritual program on Dunya News offering daily Islamic guidance, Quranic verses, and motivational insights to start the day with faith and purpose. Dr. Lakhvi has been a regular guest delivering enlightening talks on Quranic themes and contemporary Islamic issues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
