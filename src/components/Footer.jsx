import { COLORS, NAV_ITEMS } from "../constants";

export default function Footer({ setPage }) {
  return (
    <footer style={{ background: COLORS.charcoal, padding: "60px 24px 24px", color: "rgba(250,246,239,0.7)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: "'Amiri',serif", fontSize: 20, color: COLORS.goldLight, marginBottom: 8 }}>Dr. Muhammad Hammad Lakhvi</div>
            <div className="urdu" style={{ fontSize: 13, color: "rgba(250,246,239,0.5)", lineHeight: 1.8 }}>
              • صدر فیتھ فاؤنڈیشن <br />
              • سابق ڈین کلیہ علوم اسلامیہ جامعہ پنجاب <br />
              • ڈائریکٹر ادارہ علوم اسلامیہ جامعہ پنجاب لاہور
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: COLORS.gold, marginBottom: 16 }}>Quick Links</div>
            {NAV_ITEMS.map(n => (
              <button key={n.id} onClick={() => { setPage(n.id); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ display: "block", background: "none", border: "none", cursor: "pointer", color: "rgba(250,246,239,0.6)", fontSize: 13, padding: "4px 0", fontFamily: "'Libre Baskerville',serif", textAlign: "left" }}>{n.label}</button>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: COLORS.gold, marginBottom: 16 }}>Organizations</div>
            {["Markazi Jamiat Ahlul Hadith", "Pegham TV", "Faith Welfare Foundation", "Punjab Quran Board"].map(o => (
              <div key={o} style={{ fontSize: 13, padding: "4px 0", color: "rgba(250,246,239,0.6)" }}>— {o === "Faith Welfare Foundation" ? "Faith Foundation" : o}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: COLORS.gold, marginBottom: 16 }}>Qualifications</div>
            {["Post-Doctorate, Glasgow UK", "Ph.D. Islamic Studies", "LLB Law", "MA Islamiyat — Gold Medal", "MA Arabic"].map(q => (
              <div key={q} style={{ fontSize: 12, padding: "4px 0", color: "rgba(250,246,239,0.6)" }}>✦ {q}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(184,151,42,0.2)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div className="urdu" style={{ fontSize: 14, color: "rgba(250,246,239,0.4)" }}>بسم اللّٰہ الرحمن الرحیم</div>
          <div style={{ fontSize: 12, color: "rgba(250,246,239,0.4)" }}>
            © 2026 Dr. Muhammad Hammad Lakhvi · All rights reserved
            <span style={{ margin: "0 10px", opacity: 0.5 }}>|</span>
            Developed by <a href="https://minderfly.com" target="_blank" rel="noreferrer" style={{ color: COLORS.goldLight, textDecoration: "none", fontWeight: 600 }}>Minderfly.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
