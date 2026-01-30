import React, { useState } from "react";

export default function VideoEditor() {

  const [effect, setEffect] = useState("cyborg");
  const [status, setStatus] = useState("");

  const renderVideo = async () => {

    setStatus("Rendering AI video...");

    await fetch("http://localhost:5000/api/render", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        effect,
        video: "demo.mp4",
        overlay: "dragon@00:05"
      })
    });

    setStatus("AI render job queued");
  };

  return (
    <div className="card">

      <h2>AI Video Editor</h2>

      <select value={effect} onChange={e => setEffect(e.target.value)}>
        <option value="cyborg">Cyborg</option>
        <option value="anime">Anime</option>
        <option value="cinematic">Cinematic</option>
      </select>

      <button onClick={renderVideo}>
        Render AI Video
      </button>

      {status && <p>{status}</p>}

      <div style={{ marginTop: "10px" }}>
        <p>Preview (Mock)</p>
        <div style={{ height: "150px", background: "#ddd" }} />
      </div>

    </div>
  );
}
