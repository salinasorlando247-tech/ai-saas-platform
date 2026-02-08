export default function VoiceControls({ config, setConfig }) {
  return (
    <>
      <label>Intensity</label>
      <input type="range" min="0" max="100"
        onChange={e => setConfig({
          ...config,
          emotionSliders: { ...config.emotionSliders, intensity: e.target.value }
        })}
      />

      <label>Warmth</label>
      <input type="range" min="0" max="100"
        onChange={e => setConfig({
          ...config,
          emotionSliders: { ...config.emotionSliders, warmth: e.target.value }
        })}
      />
    </>
  );
}
