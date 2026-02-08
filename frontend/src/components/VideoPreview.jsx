import axios from "axios";

export default function VoicePreview({ config }) {
  const preview = async () => {
    const res = await axios.post("/api/voice/preview", config);
    new Audio(res.data.audioUrl).play();
  };

  return <button onClick={preview}>Preview Voice</button>;
}
