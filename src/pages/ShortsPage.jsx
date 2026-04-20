import { useState, useEffect } from "react";
import axios from "axios";
import { COLORS, API_BASE, IMG_BASE } from "../constants";
import { SectionHeader, VideoCard } from "../components/UI";
import SEO from "../components/SEO";

export default function ShortsPage({ onVideoClick }) {
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClips = async () => {
      try {
        const res = await axios.get(`${API_BASE}/videos`);
        setClips(res.data.filter(v => v.type === "CLIP"));
      } catch (err) {
        console.error("Error fetching clips:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClips();
  }, []);

  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <SEO 
        title="Islamic Short Clips & Reminders" 
        description="Watch short Islamic lectures and reminders by Prof. Dr. Muhammad Hammad Lakhvi."
      />
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader title="Short Video Clips" urdu="مختصر ویڈیوز" sub="Watch & share short Islamic lectures" />
        
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: COLORS.textLight }}>Loading clips...</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 28 }}>
            {clips.map((v, i) => (
              <div key={v.id + i} style={{ animation: `fadeUp 0.6s ease ${i * 0.08}s both` }}>
                <VideoCard video={v} onClick={onVideoClick} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
