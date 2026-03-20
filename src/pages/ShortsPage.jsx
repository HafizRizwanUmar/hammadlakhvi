import { COLORS } from "../constants";
import { SectionHeader, VideoCard } from "../components/UI";
import { SHORT_CLIPS } from "../data/videos";

export default function ShortsPage({ onVideoClick }) {
  return (
    <div style={{ padding: "100px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader title="Short Video Clips" urdu="مختصر ویڈیوز" sub="Watch & share short Islamic lectures" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 28 }}>
          {SHORT_CLIPS.map((v, i) => (
            <div key={v.id + i} style={{ animation: `fadeUp 0.6s ease ${i * 0.08}s both` }}>
              <VideoCard video={v} onClick={onVideoClick} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
