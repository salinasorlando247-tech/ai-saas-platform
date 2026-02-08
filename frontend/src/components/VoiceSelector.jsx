export default function VoiceSelector({ value, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      <option value="cinematic_narrator">Cinematic Narrator</option>
      <option value="genz_animated">Gen-Z Animated</option>
      <option value="robot_ai">Robot AI</option>
      <option value="villain_overlord">Villain Overlord</option>
    </select>
  );
}
