import { useState } from "react";
import { COLORS } from "../constants";
import { SectionHeader } from "../components/UI";

const FATWAS = [
  { q: "Is cryptocurrency permissible in Islam?", a: "This is a matter of scholarly debate. Contemporary scholars differ based on whether digital currencies fulfill the conditions of valid exchange. Please consult the full recorded lecture for a detailed analysis." },
  { q: "What is the ruling on combining prayers while traveling?", a: "Combining prayers (Jam'a) is permissible during travel according to the established Sunnah. The Hanafi, Shafi'i, Maliki and Hanbali schools differ on specific conditions." },
  { q: "Can women attend Friday prayers at the mosque?", a: "Women's attendance at mosques has strong evidence in primary Islamic sources. Our research article 'Attendance of Women in Mosques' (2018) provides a comprehensive legal analysis." },
];

export default function FatwaPage() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div style={{ padding: "100px 24px 100px", background: COLORS.cream, minHeight: "100vh" }}>
      <SEO 
        title="Islamic Q&A and Fatwa" 
        description="Get authentic Islamic guidance and answers to contemporary questions in the light of Quran and Sunnah."
      />
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <SectionHeader title="Q&A / Fatwas" urdu="سوال و جواب / فتاوی" sub="Islamic Jurisprudence & Guidance" />
        <div style={{ background: `${COLORS.gold}11`, border: `1px solid ${COLORS.gold}44`, padding: "16px 24px", borderRadius: 2, marginBottom: 32 }}>
          <p style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.7 }}><strong>Note:</strong> Responses here are brief summaries. For comprehensive fatawa, please watch the full recorded sessions or contact us.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left" }}>
          {FATWAS.map((f, i) => (
            <div key={i} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, overflow: "hidden" }}>
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, textAlign: "left", fontFamily: "'Libre Baskerville',serif" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ color: COLORS.gold, fontSize: 20, flexShrink: 0 }}>❓</span>
                  <span style={{ fontSize: 15, color: COLORS.darkGreen, fontWeight: 600 }}>{f.q}</span>
                </div>
                <span style={{ color: COLORS.gold, fontSize: 20, flexShrink: 0 }}>{openIdx === i ? "▲" : "▼"}</span>
              </button>
              {openIdx === i && (
                <div style={{ padding: "16px 24px 20px 56px", borderTop: `1px solid ${COLORS.border}` }}>
                  <p style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.8 }}>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, padding: "32px", background: COLORS.darkGreen, borderRadius: 2, textAlign: "center" }}>
          <div style={{ fontFamily: "'Amiri',serif", fontSize: 22, color: COLORS.goldLight, marginBottom: 8 }}>Submit Your Question</div>
          <p style={{ color: "rgba(250,246,239,0.7)", fontSize: 13, marginBottom: 20 }}>For personal Islamic guidance and fatawa, reach out via the contact form</p>
          <button style={{ background: COLORS.gold, color: COLORS.darkGreen, border: "none", padding: "12px 32px", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2 }}>Ask a Question →</button>
        </div>
      </div>
    </div>
  );
}
