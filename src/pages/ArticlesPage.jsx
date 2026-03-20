import { useState, useMemo } from "react";
import { COLORS } from "../constants";
import { SectionHeader } from "../components/UI";
import { ARTICLES, ARTICLE_CATEGORIES } from "../data/articles";

const CATEGORY_COLORS = {
  Seerah: "#2C5F3F", Theology: "#1A3A2A", History: "#6B4A1A",
  Fiqh: "#1A3A5C", Philosophy: "#4A1A6B", Ethics: "#6B1A3A",
  Economics: "#3A5C1A", Interfaith: "#1A5C5C", Tafseer: "#5C3A1A",
  "Peace Studies": "#1A4A5C", Contemporary: "#3A3A6B",
};
const catColor = (cat) => CATEGORY_COLORS[cat] || COLORS.green;

export default function ArticlesPage({ onArticleSelect }) {
  const [langFilter, setLangFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => ARTICLES.filter((a) => {
    if (langFilter !== "all" && a.lang !== langFilter) return false;
    if (catFilter !== "all" && a.category !== catFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const hay = [a.title, a.titleEn, a.journal, a.abstract, a.category].filter(Boolean).join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }), [langFilter, catFilter, search]);

  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <SectionHeader title="Research Articles" urdu="علمی مقالات" sub="47+ peer-reviewed publications · click any article to read" />

        {/* Filter panel */}
        <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 4, padding: "20px 24px", marginBottom: 28 }}>
          {/* Search */}
          <div style={{ position: "relative", marginBottom: 16 }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 15, opacity: 0.4 }}>🔍</span>
            <input type="text" placeholder="Search title, abstract, journal…" value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", padding: "10px 40px 10px 40px", border: `1px solid ${COLORS.border}`, borderRadius: 2, fontSize: 13, fontFamily: "'Libre Baskerville',serif", background: COLORS.cream, color: COLORS.text, outline: "none", boxSizing: "border-box" }} />
            {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, opacity: 0.5 }}>×</button>}
          </div>

          {/* Language */}
          <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: COLORS.textLight, flexShrink: 0 }}>Language:</span>
            {[["all","All"],["en","English"],["urdu","اردو"]].map(([v,l]) => (
              <button key={v} onClick={() => setLangFilter(v)} style={{ background: langFilter===v ? COLORS.darkGreen : "transparent", border: `1px solid ${langFilter===v ? COLORS.darkGreen : COLORS.border}`, color: langFilter===v ? COLORS.cream : COLORS.text, padding: "5px 16px", fontSize: 12, cursor: "pointer", borderRadius: 2, fontFamily: "'Libre Baskerville',serif", transition: "all 0.15s" }}>{l}</button>
            ))}
          </div>

          {/* Category */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: COLORS.textLight, flexShrink: 0 }}>Category:</span>
            <button onClick={() => setCatFilter("all")} style={{ background: catFilter==="all" ? COLORS.gold : "transparent", border: `1px solid ${catFilter==="all" ? COLORS.gold : COLORS.border}`, color: catFilter==="all" ? COLORS.darkGreen : COLORS.textLight, padding: "4px 12px", fontSize: 11, cursor: "pointer", borderRadius: 2, fontWeight: catFilter==="all" ? 700 : 400 }}>All</button>
            {ARTICLE_CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setCatFilter(cat)} style={{ background: catFilter===cat ? catColor(cat) : "transparent", border: `1px solid ${catFilter===cat ? catColor(cat) : COLORS.border}`, color: catFilter===cat ? "#fff" : COLORS.textLight, padding: "4px 12px", fontSize: 11, cursor: "pointer", borderRadius: 2, fontWeight: catFilter===cat ? 700 : 400, transition: "all 0.15s" }}>{cat}</button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div style={{ fontSize: 12, color: COLORS.textLight, marginBottom: 16 }}>
          Showing {filtered.length} of {ARTICLES.length} articles
          {(langFilter !== "all" || catFilter !== "all" || search) && (
            <button onClick={() => { setLangFilter("all"); setCatFilter("all"); setSearch(""); }} style={{ marginLeft: 12, background: "none", border: "none", color: COLORS.gold, fontSize: 12, cursor: "pointer", textDecoration: "underline" }}>Clear filters</button>
          )}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 24px", color: COLORS.textLight }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p>No articles match your filters.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map((a, i) => (
              <div key={a.id || i} className="article-card" onClick={() => onArticleSelect(a)}
                style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, borderLeft: `4px solid ${catColor(a.category)}`, animation: `slideIn 0.4s ease ${i * 0.03}s both`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className={a.lang === "urdu" ? "urdu" : ""} style={{ fontSize: a.lang === "urdu" ? 16 : 15, color: COLORS.darkGreen, fontWeight: 600, marginBottom: a.titleEn ? 2 : 6, lineHeight: a.lang === "urdu" ? 2 : 1.4 }}>{a.title}</div>
                  {a.titleEn && a.lang === "urdu" && <div style={{ fontSize: 12, color: COLORS.textLight, fontStyle: "italic", marginBottom: 6 }}>{a.titleEn}</div>}
                  <div style={{ fontSize: 12, color: COLORS.textLight, marginBottom: 8 }}>{a.journal}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                    <span style={{ background: `${catColor(a.category)}18`, color: catColor(a.category), border: `1px solid ${catColor(a.category)}44`, padding: "2px 8px", fontSize: 10, borderRadius: 2, fontWeight: 600 }}>{a.category}</span>
                    {a.lang === "urdu"
                      ? <span style={{ background: "#1A3A2A18", color: COLORS.darkGreen, border: "1px solid #1A3A2A33", padding: "2px 8px", fontSize: 10, borderRadius: 2 }}>اردو</span>
                      : <span style={{ background: "#6B1A3A18", color: "#6B1A3A", border: "1px solid #6B1A3A33", padding: "2px 8px", fontSize: 10, borderRadius: 2 }}>English</span>}
                    {a.content && <span style={{ background: `${COLORS.gold}22`, color: COLORS.gold, border: `1px solid ${COLORS.gold}44`, padding: "2px 8px", fontSize: 10, borderRadius: 2, fontWeight: 700 }}>📄 Full Text</span>}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                  <span style={{ background: `${COLORS.gold}22`, color: COLORS.gold, padding: "4px 12px", fontSize: 12, borderRadius: 2, fontWeight: 600 }}>{a.year}</span>
                  {a.pages && <span style={{ fontSize: 11, color: COLORS.textLight }}>pp. {a.pages}</span>}
                  <span style={{ fontSize: 11, color: catColor(a.category), fontWeight: 700 }}>Read More →</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 32, padding: "18px 24px", background: `${COLORS.green}11`, border: `1px solid ${COLORS.green}44`, borderRadius: 2, textAlign: "center" }}>
          <p style={{ color: COLORS.green, fontSize: 14 }}>Full bibliography available upon request · <strong>47+ publications</strong> in national and international journals</p>
        </div>
      </div>
    </div>
  );
}
