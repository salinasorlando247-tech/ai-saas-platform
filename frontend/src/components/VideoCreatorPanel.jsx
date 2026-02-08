// src/components/VideoCreatorPanel.jsx
import React, { useState } from "react";

export default function VideoCreatorPanel({ token }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [platform, setPlatform] = useState("");

  const handleCreate = () => {
    fetch("http://localhost:5001/videos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description: desc, platform }),
    }).then(res => res.json())
      .then(data => {
        alert("Video logged: ID " + data.id);
        setTitle(""); setDesc(""); setPlatform("");
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="panel video-creator-panel">
      <h2>Video Creator</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description" />
      <input value={platform} onChange={e => setPlatform(e.target.value)} placeholder="Platform" />
      <button onClick={handleCreate}>Create Video</button>
    </div>
  );
}
