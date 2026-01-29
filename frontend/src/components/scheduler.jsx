import React, { useState } from "react";

export default function Scheduler() {

  const [platform, setPlatform] = useState("TikTok");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");

  const schedulePost = async () => {

    const res = await fetch("http://localhost:5000/api/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform, time })
    });

    const data = await res.json();

    if (data.success) {
      setStatus("Post scheduled successfully");
    }
  };

  return (
    <div className="card">

      <h2>Post Scheduler</h2>

      <select value={platform} onChange={e => setPlatform(e.target.value)}>
        <option>TikTok</option>
        <option>YouTube</option>
        <option>Instagram</option>
      </select>

      <input
        type="time"
        value={time}
        onChange={e => setTime(e.target.value)}
      />

      <button onClick={schedulePost}>
        Schedule Post
      </button>

      {status && <p>{status}</p>}

    </div>
  );
}
