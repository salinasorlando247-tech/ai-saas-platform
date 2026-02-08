export default function HonestyMeter({ level }) {
  const colors = {
    HIGH: "#00ff88",
    MEDIUM: "#ffaa00",
    EXPERIMENTAL: "#ff4444"
  };

  return (
    <div style={{
      border: `2px solid ${colors[level]}`,
      padding: "12px",
      borderRadius: "8px"
    }}>
      <strong>Model Honesty:</strong> {level}
    </div>
  );
}
