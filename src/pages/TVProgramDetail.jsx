import { COLORS } from "../constants";
import { BackBtn, VideoCard } from "../components/UI";

export default function TVProgramDetailPage({ program, onBack, onVideoClick, onPayamSubahOpen }) {
  if (!program) return null;

  // Payam-e-Subah uses special yearly page
  if (program.useYearlyFormat) {
    onPayamSubahOpen();
    return null;
  }

  return (
    <div style={{ padding: "80px 24px 80px", background: COLORS.cream, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <BackBtn onClick={onBack} label="← Back to Programs" />

        {/* Program header */}
        <div style={{ background: `linear-gradient(135deg,${COLORS.darkGreen},${COLORS.green})`, borderRadius: 2, padding: "40px", marginBottom: 40, borderTop: `5px solid ${program.channelColor}` }}>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ fontSize: 56 }}>{program.icon}</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontSize: 11, color: "rgba(250,246,239,0.6)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>TV Program · {program.channel}</div>
              <div className="urdu" style={{ fontSize: 28, color: COLORS.goldLight, lineHeight: 1.8, marginBottom: 4 }}>{program.name}</div>
              <div style={{ fontFamily: "'Amiri',serif", fontSize: 20, color: COLORS.cream, marginBottom: 14 }}>{program.en}</div>
              <p style={{ color: "rgba(250,246,239,0.8)", fontSize: 14, lineHeight: 1.8 }}>{program.description}</p>
            </div>
          </div>
        </div>

        {/* YouTube Videos */}
        {program.videos && program.videos.length > 0 && (
          <div>
            <h3 style={{ fontFamily: "'Amiri',serif", fontSize: 22, color: COLORS.darkGreen, marginBottom: 20, paddingBottom: 10, borderBottom: `2px solid ${COLORS.border}` }}>
              🎬 Available Episodes
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24 }}>
              {program.videos.map((v, i) => (
                <VideoCard
                  key={v.id + i}
                  video={v}
                  onClick={onVideoClick}
                  style={{ animation: `fadeUp 0.5s ease ${i * 0.08}s both` }}
                />
              ))}
            </div>
          </div>
        )}

        {(!program.videos || program.videos.length === 0) && (
          <div style={{ textAlign: "center", padding: "60px", color: COLORS.textLight }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📺</div>
            <p style={{ fontSize: 16 }}>Videos coming soon. Please check the official channels.</p>
          </div>
        )}
      </div>
    </div>
  );
}
