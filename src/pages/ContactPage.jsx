import { useState } from "react";
import axios from "axios";
import { COLORS, API_BASE, IMG_BASE } from "../constants";
import { SectionHeader } from "../components/UI";
import SEO from "../components/SEO";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/inquiries`, form);
      setSent(true);
    } catch (err) {
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <SEO 
        title="Contact Dr. Muhammad Hammad Lakhvi" 
        description="Get in touch with Prof. Dr. Muhammad Hammad Lakhvi for queries, scholarly advice, or community invitations."
      />
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader title="Contact" urdu="رابطہ" sub="Get in touch for lectures, fatawa, or media" />
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {/* Info */}
          <div>
            <h3 style={{ fontFamily: "'Amiri',serif", fontSize: 22, color: COLORS.darkGreen, marginBottom: 24 }}>Contact Information</h3>
            {[
              { icon: "🕌", label: "Masjid", val: "Masjid Al-Mubarak, Lahore (Friday Khutbah)" },
              { icon: "🏛️", label: "Formerly", val: "Institute of Islamic Studies, University of the Punjab" },
              { icon: "📺", label: "Pegham TV", val: "Weekly Tafseer Al-Quran Broadcast" },
              { icon: "🌐", label: "Organization", val: "Markazi Jamiat Ahlul Hadith Pakistan — Deputy Amir" },
              { icon: "🏢", label: "Foundation", val: "Faith Welfare Foundation — President (2024–)" },
            ].map(c => (
              <div key={c.label} style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "flex-start" }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: COLORS.gold, marginBottom: 2 }}>{c.label}</div>
                  <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.5 }}>{c.val}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 24, padding: "20px", background: COLORS.darkGreen, borderRadius: 2 }}>
              <div className="urdu" style={{ fontSize: 16, color: COLORS.goldLight, marginBottom: 8 }}>فیتھ ویلفیئر فاؤنڈیشن</div>
              <p style={{ color: "rgba(250,246,239,0.7)", fontSize: 12, lineHeight: 1.7 }}>For institutional inquiries, invitations to conferences, and media appearances, please use the contact form.</p>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div style={{ textAlign: "center", padding: "60px 20px", animation: "fadeIn 0.5s ease" }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
                <div style={{ fontFamily: "'Amiri',serif", fontSize: 24, color: COLORS.darkGreen, marginBottom: 8 }}>Message Sent!</div>
                <p style={{ color: COLORS.textLight, fontSize: 14 }}>JazakAllahu Khayran. We will respond as soon as possible.</p>
                <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }} style={{ marginTop: 20, background: COLORS.darkGreen, color: COLORS.cream, border: "none", padding: "10px 24px", borderRadius: 2, cursor: "pointer", fontSize: 13 }}>Send Another →</button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {error && <div style={{ color: '#e03131', fontSize: '13px', background: '#fff0f0', padding: '10px', borderRadius: '4px', border: '1px solid #ffa8a8' }}>{error}</div>}
                {[
                  { key: "name", label: "Your Name", type: "text", placeholder: "Muhammad Ali" },
                  { key: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                  { key: "subject", label: "Subject", type: "text", placeholder: "Question about..." },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: COLORS.textLight, marginBottom: 6 }}>{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.key]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      style={{ width: "100%", padding: "12px 16px", border: `1px solid ${COLORS.border}`, borderRadius: 2, fontSize: 14, fontFamily: "'Libre Baskerville',serif", background: COLORS.white, outline: "none", color: COLORS.text }}
                      disabled={loading}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: COLORS.textLight, marginBottom: 6 }}>Message</label>
                  <textarea
                    placeholder="Your question or message..."
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{ width: "100%", padding: "12px 16px", border: `1px solid ${COLORS.border}`, borderRadius: 2, fontSize: 14, fontFamily: "'Libre Baskerville',serif", background: COLORS.white, outline: "none", resize: "vertical", color: COLORS.text }}
                    disabled={loading}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{ background: `linear-gradient(135deg,${COLORS.darkGreen},${COLORS.green})`, color: COLORS.cream, border: "none", padding: "14px 32px", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", borderRadius: 2, fontWeight: 700, opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? "Sending..." : "Send Message →"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
