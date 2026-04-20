import { useState, useEffect } from "react";
import axios from "axios";
import { COLORS, API_BASE, IMG_BASE } from "../constants";
import { SectionHeader, BackBtn, VideoCard } from "../components/UI";
import SEO from "../components/SEO";

function SeriesDetailView({ series, onBack, onVideoClick }) {
  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <BackBtn onClick={onBack} label="← Back to Series" />
        <div className="series-detail-header">
          <div className="series-detail-thumb-container">
            <img src={series.thumbnail && series.thumbnail.startsWith('/') ? `${IMG_BASE}${series.thumbnail}` : (series.thumbnail || (series.videos && series.videos[0] ? `https://img.youtube.com/vi/${series.videos[0].id}/hqdefault.jpg` : ""))} alt={series.title}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:60px">📚</div>`; }} />
          </div>
          <div className="series-detail-info">
            <div className="series-meta" style={{ display: "flex", gap: 10, fontSize: 11, color: "rgba(250,246,239,0.6)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>
              <span>{series.channel}</span><span>•</span><span style={{ color: COLORS.goldLight }}>{series.videos?.length || 0} Episodes</span>
            </div>
            <div className="urdu" style={{ fontSize: 26, color: COLORS.goldLight, lineHeight: 1.8, marginBottom: 4 }}>{series.title}</div>
            <div style={{ fontFamily: "'Amiri',serif", fontSize: 20, color: COLORS.cream, marginBottom: 12 }}>{series.subtitle || series.en}</div>
            <p style={{ color: "rgba(250,246,239,0.75)", fontSize: 13, lineHeight: 1.8 }}>{series.description}</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24 }}>
          {series.videos && series.videos.map((v, i) => (
            <div key={v.id + i} style={{ animation: `fadeUp 0.5s ease ${i * 0.07}s both` }}>
              <VideoCard video={v} onClick={onVideoClick} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LecturesPage({ onVideoClick }) {
  const [tab, setTab] = useState("series");
  const [activeSeriesId, setActiveSeriesId] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [{ id: "series", label: "Series" }, { id: "full", label: "Full Lectures" }];

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${API_BASE}/videos`);
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const lectureSeries = videos.filter(v => v.type === "SERIES");
  const longVideos = videos.filter(v => v.type === "LONG");

  if (activeSeriesId) {
    const s = lectureSeries.find(x => x.id === activeSeriesId || x._id === activeSeriesId);
    if (s) return <SeriesDetailView series={s} onBack={() => setActiveSeriesId(null)} onVideoClick={onVideoClick} />;
  }

  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <SEO 
        title="Islamic Lectures & Video Series" 
        description="Comprehensive collection of Tafseer, Hadith, and Islamic lecture series by Prof. Dr. Muhammad Hammad Lakhvi."
      />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader title="Lectures & Durus" urdu="دروس و خطبات" sub="Quran · Tafseer · Hadeeth · Series" />
        <div style={{ display: "flex", gap: 0, marginBottom: 40, borderBottom: `2px solid ${COLORS.border}`, flexWrap: "wrap" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 26px", fontFamily: "'Libre Baskerville',serif", fontSize: 14, letterSpacing: "0.05em", color: tab === t.id ? COLORS.green : COLORS.textLight, borderBottom: tab === t.id ? `3px solid ${COLORS.gold}` : "3px solid transparent", fontWeight: tab === t.id ? 700 : 400, marginBottom: -2 }}>{t.label}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: COLORS.textLight }}>Loading lectures...</div>
        ) : (
          <>
            {tab === "series" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: 28 }}>
                {lectureSeries.map((s, i) => (
                  <div key={s.id || s._id} className="series-card" onClick={() => setActiveSeriesId(s.id || s._id)}
                    style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 2, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", animation: `fadeUp 0.5s ease ${i * 0.1}s both` }}>
                    <div style={{ position: "relative", aspectRatio: "16/9", background: "#000", overflow: "hidden" }}>
                      <img src={(s.thumbnail && s.thumbnail.startsWith('/') ? `${IMG_BASE}${s.thumbnail}` : s.thumbnail) || `https://img.youtube.com/vi/${s.videos?.[0]?.id}/hqdefault.jpg`} alt={s.title}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:${COLORS.darkGreen};color:${COLORS.goldLight};font-size:48px">📚</div>`; }} />
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.32)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(184,151,42,0.92)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 20, marginLeft: 3 }}>▶</span>
                        </div>
                      </div>
                      <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(26,58,42,0.9)", color: COLORS.goldLight, padding: "3px 10px", fontSize: 11, borderRadius: 2, border: `1px solid ${COLORS.gold}` }}>{s.videos?.length || 0} Episodes</div>
                    </div>
                    <div style={{ padding: "18px 20px 20px" }}>
                      <div className="urdu" style={{ fontSize: 18, color: COLORS.darkGreen, fontWeight: 700, lineHeight: 1.8, marginBottom: 2 }}>{s.title}</div>
                      <div style={{ fontFamily: "'Amiri',serif", fontSize: 14, color: COLORS.green, marginBottom: 10 }}>{s.subtitle || s.en}</div>
                      <p style={{ fontSize: 12, color: COLORS.textLight, lineHeight: 1.7, marginBottom: 14 }}>{s.description?.slice(0, 95)}…</p>
                      <div style={{ color: COLORS.gold, fontSize: 12, fontWeight: 700 }}>VIEW ALL EPISODES →</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "full" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 28 }}>
                {longVideos.map((v, i) => (
                  <div key={v.id + i} style={{ animation: `fadeUp 0.5s ease ${i * 0.1}s both` }}>
                    <VideoCard video={{ ...v, ep: `⏱ ${v.duration}` }} onClick={onVideoClick} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <div style={{ marginTop: 48, textAlign: "center", padding: "40px", background: COLORS.darkGreen, borderRadius: 2 }}>
          <div style={{ fontFamily: "'Amiri',serif", fontSize: 24, color: COLORS.goldLight, marginBottom: 8 }}>Watch All Lectures on YouTube</div>
          <p style={{ color: "rgba(250,246,239,0.7)", marginBottom: 20, fontSize: 14 }}>Subscribe to the official channel for weekly Tafseer durus and more</p>
          <a href="https://youtube.com/@profdrmuhammadhammadlakhvi" target="_blank" rel="noreferrer" style={{ display: "inline-block", background: COLORS.gold, color: COLORS.darkGreen, padding: "12px 32px", textDecoration: "none", fontWeight: 700, fontSize: 14, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 2 }}>🎬 YouTube Channel →</a>
        </div>
      </div>
    </div>
  );
}
