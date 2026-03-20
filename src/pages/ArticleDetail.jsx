import { COLORS } from "../constants";
import { BackBtn } from "../components/UI";

export default function ArticleDetailPage({ article, onBack }) {
  if (!article) return null;
  const isUrdu = article.lang === "urdu";
  const hasContent = Boolean(article.content);
  const hasFootnotes = Array.isArray(article.footnotes) && article.footnotes.length > 0;

  return (
    <div style={{ padding: "80px 12px 60px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", width: "100%" }}>
        <BackBtn onClick={onBack} label="← Back to Articles" />

        <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 4, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>

          {/* ── Header ─────────────────────────────────────────────────────── */}
          <div style={{ background: `linear-gradient(135deg,${COLORS.darkGreen},${COLORS.green})`, padding: "20px 16px 24px" }}>
            <span style={{ background: "rgba(184,151,42,0.3)", color: COLORS.goldLight, padding: "3px 12px", fontSize: 10, borderRadius: 2, letterSpacing: "0.1em", textTransform: "uppercase", display: "inline-block", marginBottom: 12 }}>
              {article.category}
            </span>

            <div
              className={isUrdu ? "urdu" : ""}
              style={{
                fontSize: isUrdu ? "clamp(16px,4vw,24px)" : "clamp(15px,3vw,21px)",
                color: COLORS.cream,
                fontFamily: isUrdu ? "'Noto Nastaliq Urdu',serif" : "'Amiri',serif",
                fontWeight: 700,
                lineHeight: isUrdu ? 2 : 1.4,
                marginBottom: article.titleEn ? 6 : 14,
              }}
            >{article.title}</div>

            {article.titleEn && isUrdu && (
              <div style={{ fontSize: "clamp(12px,2.5vw,15px)", color: "rgba(250,246,239,0.72)", fontStyle: "italic", fontFamily: "'Amiri',serif", marginBottom: 14, lineHeight: 1.5 }}>
                {article.titleEn}
              </div>
            )}

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <span style={{ color: "rgba(250,246,239,0.65)", fontSize: 12 }}>📰 {article.journal}</span>
              <span style={{ color: COLORS.goldLight, fontSize: 12 }}>📅 {article.year}</span>
              {article.pages && <span style={{ color: "rgba(250,246,239,0.65)", fontSize: 12 }}>📄 pp. {article.pages}</span>}
            </div>
          </div>

          {/* ── Body ──────────────────────────────────────────────────────── */}
          <div style={{ padding: "20px 14px 28px" }}>

            {/* Abstract */}
            <h3 style={{ fontFamily: "'Amiri',serif", fontSize: 16, color: COLORS.darkGreen, marginBottom: 10 }}>Abstract</h3>
            <div style={{ background: `${COLORS.gold}08`, border: `1px solid ${COLORS.gold}33`, borderLeft: `4px solid ${COLORS.gold}`, padding: "12px 14px", borderRadius: 2, marginBottom: 24 }}>
              <p
                className={isUrdu ? "urdu" : ""}
                style={{ fontSize: isUrdu ? "clamp(13px,3vw,15px)" : 13, lineHeight: isUrdu ? 2.3 : 1.85, color: COLORS.text, margin: 0 }}
              >{article.abstract}</p>
            </div>

            {/* Meta grid — 2 col; collapses to 1 on narrow screens via CSS */}
            <style>{`
              @media (max-width: 500px) {
                .art-meta-grid { grid-template-columns: 1fr !important; }
              }
            `}</style>
            <div className="art-meta-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24 }}>
              {[
                { label: "Author(s)", value: article.authors || "Prof. Dr. Muhammad Hammad Lakhvi" },
                { label: "Published In", value: article.journal },
                { label: "Year", value: article.year },
                { label: "Language", value: isUrdu ? "Urdu / اردو" : "English" },
                ...(article.pages  ? [{ label: "Pages",          value: article.pages }]  : []),
                ...(article.volume ? [{ label: "Volume / Issue", value: article.volume }] : []),
                { label: "Category", value: article.category },
              ].map(row => (
                <div key={row.label} style={{ background: COLORS.cream, padding: "10px 12px", borderRadius: 2, border: `1px solid ${COLORS.border}` }}>
                  <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", color: COLORS.textLight, marginBottom: 3 }}>{row.label}</div>
                  <div style={{ fontSize: 12, color: COLORS.text, fontWeight: 600, lineHeight: 1.4 }}>{row.value}</div>
                </div>
              ))}
            </div>

            {/* External link */}
            {article.url && (
              <div style={{ marginBottom: 24 }}>
                <a href={article.url} target="_blank" rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: COLORS.darkGreen, color: COLORS.cream, padding: "10px 20px", borderRadius: 2, textDecoration: "none", fontSize: 12, fontWeight: 700 }}>
                  🔗 View Full Article (Journal Website)
                </a>
              </div>
            )}

            {/* ── Full content ─────────────────────────────────────────── */}
            {hasContent ? (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <h3 style={{ fontFamily: "'Amiri',serif", fontSize: 16, color: COLORS.darkGreen, margin: 0 }}>Full Article</h3>
                  <span style={{ background: `${COLORS.gold}22`, color: COLORS.gold, border: `1px solid ${COLORS.gold}44`, padding: "2px 8px", fontSize: 9, borderRadius: 2, fontWeight: 700 }}>📄 Full Text</span>
                </div>
                <div
                  className={isUrdu ? "urdu" : ""}
                  style={{
                    background: COLORS.cream,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 2,
                    padding: "16px 14px",
                    lineHeight: isUrdu ? 2.5 : 1.9,
                    fontSize: isUrdu ? "clamp(13px,3.5vw,15px)" : "clamp(12px,2.5vw,14px)",
                    color: COLORS.text,
                    whiteSpace: "pre-wrap",
                    fontFamily: isUrdu ? "'Noto Nastaliq Urdu',serif" : "'Amiri',serif",
                    textAlign: isUrdu ? "right" : "left",
                    wordBreak: "break-word",
                    overflowX: "hidden",
                  }}
                >
                  {article.content}
                </div>

                {/* ── Footnotes / References ──────────────────────────── */}
                {hasFootnotes && (
                  <div style={{ marginTop: 28 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, paddingBottom: 10, borderBottom: `2px solid ${COLORS.border}` }}>
                      <h3 style={{ fontFamily: "'Amiri',serif", fontSize: 16, color: COLORS.darkGreen, margin: 0 }}>حوالہ جات</h3>
                      <span style={{ fontSize: 12, color: COLORS.textLight, fontStyle: "italic" }}>References & Footnotes</span>
                    </div>
                    <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                      {article.footnotes.map((fn) => (
                        <li key={fn.ref}
                          style={{
                            display: "flex",
                            gap: 10,
                            padding: "8px 10px",
                            background: COLORS.cream,
                            borderRadius: 2,
                            borderRight: `3px solid ${COLORS.gold}`,
                            alignItems: "flex-start",
                          }}>
                          <span style={{
                            background: COLORS.gold,
                            color: COLORS.darkGreen,
                            fontSize: 10,
                            fontWeight: 700,
                            borderRadius: 2,
                            padding: "1px 6px",
                            flexShrink: 0,
                            marginTop: 1,
                            minWidth: 22,
                            textAlign: "center",
                          }}>{fn.ref}</span>
                          <span className="urdu" style={{
                            fontSize: "clamp(11px,3vw,13px)",
                            color: COLORS.text,
                            lineHeight: 2,
                            direction: "rtl",
                            textAlign: "right",
                            flex: 1,
                          }}>{fn.text}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ background: `${COLORS.green}0A`, border: `1px solid ${COLORS.green}33`, borderRadius: 2, padding: "20px 14px", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>📬</div>
                <p style={{ color: COLORS.green, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                  Full text not yet available online.{" "}
                  {article.url
                    ? <><a href={article.url} target="_blank" rel="noreferrer" style={{ color: COLORS.green, fontWeight: 700 }}>Access via journal website →</a></>
                    : "Please contact us via the Contact page to request a copy."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
