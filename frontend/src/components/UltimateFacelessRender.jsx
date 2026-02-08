import { useEffect, useState } from "react";
import axios from "axios";

export default function UltimateFacelessRender({ user }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Idle");
  const [currentVideo, setCurrentVideo] = useState(null);
  const [usage, setUsage] = useState(null);
  const [paidUnlock, setPaidUnlock] = useState(false);

  useEffect(() => {
    // Load faceless usage and unlock status
    axios.get("/api/usage/faceless").then(res => {
      setUsage(res.data);
      setPaidUnlock(res.data.unlocked);
    });
  }, []);

  const startRender = async (videoData) => {
    if (!paidUnlock) {
      setStatus("Please pay $5/month to unlock faceless videos!");
      return;
    }

    // Enforce daily usage limits
    if (usage.remainingMinutes <= 0) {
      setStatus("Daily faceless video limit reached!");
      return;
    }

    setCurrentVideo(videoData);
    setStatus("Initializing Ultra-Faceless AI Render...");
    setProgress(5);

    // Start server-side render
    const { data } = await axios.post("/api/videos/render", videoData);
    const renderId = data.renderId;

    setStatus("Rendering with Ultra-Realistic Avatars & Voice...");
    const interval = setInterval(async () => {
      const { data } = await axios.get(`/api/videos/render/${renderId}/progress`);
      setProgress(data.progress);
      setStatus(`Rendering... ${data.progress.toFixed(0)}% | Speed: ${data.speed}x | Quality: ${data.quality} | Voices: ${data.voiceType}`);

      if (data.progress >= 100) {
        setStatus("Render Complete!");
        clearInterval(interval);
      }
    }, 500);
  };

  return (
    <div style={{marginTop:"20px"}}>
      <h2>Ultimate Faceless AI Video Creator</h2>

      {/* Usage Meter */}
      {usage && (
        <p>{usage.usedMinutes} / {usage.maxMinutes} minutes used this month</p>
      )}

      {/* Render Progress Bar */}
      <div style={{border:"1px solid #555", borderRadius:"6px", width:"100%", height:"30px", overflow:"hidden", marginBottom:"10px"}}>
        <div style={{
          width:`${progress}%`,
          height:"100%",
          background: `linear-gradient(90deg, #4caf50 ${progress}%, #333 ${progress}%)`,
          transition:"width 0.3s"
        }} />
      </div>
      <p>{status}</p>

      {/* Preview Video */}
      {currentVideo && progress >= 100 && (
        <div style={{marginTop:"10px"}}>
          <h4>Preview:</h4>
          <video src={`/api/videos/${currentVideo.id}/stream`} controls style={{width:"100%", borderRadius:"6px"}} />
        </div>
      )}

      {/* Render Buttons */}
      <div style={{marginTop:"10px"}}>
        <button 
          onClick={() => startRender({ userId: user.id, length: 120, type: "faceless", avatar: "ultra", voiceType: "human" })}
          style={{marginRight:"10px", padding:"10px 20px", borderRadius:"6px", background:"#4caf50", color:"#fff", border:"none", cursor:"pointer"}}
        >
          1–2 Minute Faceless Video
        </button>

        <button 
          onClick={() => startRender({ userId: user.id, length: 300, type: "faceless", avatar: "ultra", voiceType: "human" })}
          style={{padding:"10px 20px", borderRadius:"6px", background:"#2196f3", color:"#fff", border:"none", cursor:"pointer"}}
        >
          5 Minute Faceless Video
        </button>
      </div>
    </div>
  );
}
