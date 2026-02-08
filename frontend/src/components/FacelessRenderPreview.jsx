import { useEffect, useState } from "react";
import axios from "axios";

export default function FacelessRenderPreview({ user }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Idle");
  const [currentVideo, setCurrentVideo] = useState(null);

  const startRender = async (videoData) => {
    setCurrentVideo(videoData);
    setStatus("Initializing AI Render...");
    setProgress(5);

    // Start server-side render
    const { data } = await axios.post("/api/videos/render", videoData);
    const renderId = data.renderId;

    setStatus("Rendering...");
    // Poll render progress
    const interval = setInterval(async () => {
      const { data } = await axios.get(`/api/videos/render/${renderId}/progress`);
      setProgress(data.progress);
      setStatus(`Rendering... ${data.progress}% | Speed: ${data.speed}x | Quality: ${data.quality}`);

      if (data.progress >= 100) {
        setStatus("Render Complete!");
        clearInterval(interval);
      }
    }, 500); // updates every 0.5s
  };

  return (
    <div style={{marginTop:"20px"}}>
      <h2>Faceless Video Render Preview</h2>
      <div style={{border:"1px solid #555", borderRadius:"6px", width:"100%", height:"30px", overflow:"hidden", marginBottom:"10px"}}>
        <div style={{
          width:`${progress}%`,
          height:"100%",
          background: `linear-gradient(90deg, #4caf50 ${progress}%, #333 ${progress}%)`,
          transition:"width 0.3s"
        }} />
      </div>
      <p>{status}</p>

      {currentVideo && progress === 100 && (
        <div style={{marginTop:"10px"}}>
          <h4>Preview:</h4>
          <video src={`/api/videos/${currentVideo.id}/stream`} controls style={{width:"100%", borderRadius:"6px"}} />
        </div>
      )}

      <button 
        onClick={() => startRender({ userId: user.id, length: 120, type: "faceless" })}
        style={{marginTop:"10px", padding:"10px 20px", borderRadius:"6px", background:"#4caf50", color:"#fff", border:"none", cursor:"pointer"}}
      >
        Start Faceless Video Render
      </button>
    </div>
  );
}
