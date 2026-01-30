import React, { useState } from "react";

export default function ViralScore() {

  const [videoId, setVideoId] = useState("");
  const [score, setScore] = useState(null);

  const getScore = async () => {
    const res = await fetch(`http://localhost:5000/api/viral-score/${videoId}`);
    const data = await res.json();
    setScore(data.score);
  };

  return (
    <div className="card">
      <h2>AI Viral Score</h2>

      <input
        placeholder="Enter video ID"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
      />

      <button onClick={getScore}>Check Score</button>

      {score !== null && <p>Predicted Viral Score: {score}%</p>}
    </div>
  );
}
