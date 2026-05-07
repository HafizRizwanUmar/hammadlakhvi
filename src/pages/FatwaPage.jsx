import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { COLORS, API_BASE } from "../constants";
import { SectionHeader } from "../components/UI";

export default function FatwaPage() {
  const [fatwas, setFatwas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIdx, setOpenIdx] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/fatwas`)
      .then(res => {
        setFatwas(res.data.filter(f => f.active));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "100px 24px 100px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <SectionHeader title="Q&A / Fatwas" urdu="سوال و جواب / فتاوی" sub="Islamic Jurisprudence & Guidance" />
        <div style={{ background: `${COLORS.gold}11`, border: `1px solid ${COLORS.gold}44`, padding: "16px 24px", borderRadius: 2, marginBottom: 32 }}>
          <p style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.7 }}><strong>Note:</strong> Responses here are brief summaries. For comprehensive fatawa, please watch the full recorded sessions or contact us.</p>
        </div>

        {loading ? (
          <div style={{ padding: '40px', color: COLORS.textLight }}>Loading...</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left" }}>
            {fatwas.map((f, i) => (
              <div key={f._id} style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, overflow: "hidden", animation: `fadeUp 0.5s ease ${i * 0.05}s both` }}>
                <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, textAlign: "left", fontFamily: "'Libre Baskerville',serif" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ color: COLORS.gold, fontSize: 20, flexShrink: 0 }}>❓</span>
                    <span style={{ fontSize: 15, color: COLORS.darkGreen, fontWeight: 600 }}>{f.question}</span>
                  </div>
                  <span style={{ color: COLORS.gold, fontSize: 20, flexShrink: 0 }}>{openIdx === i ? "▲" : "▼"}</span>
                </button>
                {openIdx === i && (
                  <div style={{ padding: "16px 24px 20px 56px", borderTop: `1px solid ${COLORS.border}` }}>
                    <p style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{f.answer}</p>
                  </div>
                )}
              </div>
            ))}
            {fatwas.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: COLORS.textLight }}>No questions have been posted yet.</div>
            )}
          </div>
        )}

        <div style={{ marginTop: 40, padding: "32px", background: COLORS.darkGreen, borderRadius: 2, textAlign: "center" }}>
          <div style={{ fontFamily: "'Amiri',serif", fontSize: 22, color: COLORS.goldLight, marginBottom: 8 }}>Submit Your Question</div>
          <p style={{ color: "rgba(250,246,239,0.7)", fontSize: 13, marginBottom: 20 }}>For personal Islamic guidance and fatawa, reach out via the contact form</p>
          <Link to="/contact-us" style={{ display: 'inline-block', background: COLORS.gold, color: COLORS.darkGreen, border: "none", padding: "12px 32px", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", borderRadius: 2, textDecoration: 'none' }}>Ask a Question →</Link>
        </div>
      </div>
    </div>
  );
}
