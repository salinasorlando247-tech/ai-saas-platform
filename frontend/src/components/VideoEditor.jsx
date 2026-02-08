import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";

export default function VideoEditor() {
  const [file, setFile] = useState(null);
  const [edits, setEdits] = useState([]);
  const [clips, setClips] = useState([]);
  const [overlays, setOverlays] = useState([]);
  const [effects, setEffects] = useState([]);
  const [speed, setSpeed] = useState(1);
  const [brightness, setBrightness] = useState(100);
  const [videoPreview, setVideoPreview] = useState(null);

  // Upload file
  const handleUpload = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setVideoPreview(URL.createObjectURL(f));
  };

  // Add a clip section
  const addClip = () => {
    const start = prompt("Start time (sec)");
    const end = prompt("End time (sec)");
    setClips([...clips, { start: Number(start), end: Number(end) }]);
  };

  // Add overlay
  const addOverlay = () => {
    const text = prompt("Overlay text/image URL");
    const time = prompt("Time in sec for overlay to appear");
    setOverlays([...overlays, { text, time: Number(time) }]);
  };

  // Apply AI Effect
  const addEffect = () => {
    const effectName = prompt("Enter AI effect (color, motion, etc.)");
    setEffects([...effects, effectName]);
  };

  // Apply edits
  const applyEdits = async () => {
    if (!file) return alert("Upload a video first!");

    const formData = new FormData();
    formData.append("video", file);
    formData.append("clips", JSON.stringify(clips));
    formData.append("overlays", JSON.stringify(overlays));
    formData.append("effects", JSON.stringify(effects));
    formData.append("speed", speed);
    formData.append("brightness", brightness);

    try {
      const res = await axios.post(`${API_BASE}/manual-edit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Video edited successfully!");
      setVideoPreview(res.data.path);
    } catch (err) {
      console.error(err);
      alert("Error editing video");
    }
  };

  return (
    <div>
      <h2>Manual Video Editor</h2>
      <input type="file" accept="video/*" onChange={handleUpload} />
      {videoPreview && <video src={videoPreview} controls style={{ maxWidth: "100%" }} />}
      <div style={{ marginTop: 10 }}>
        <button onClick={addClip}>Add Clip Section</button>
        <button onClick={addOverlay}>Add Overlay</button>
        <button onClick={addEffect}>Add AI Effect</button>
        <input
          type="number"
          placeholder="Speed (1 normal)"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Brightness (%)"
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
        />
        <button onClick={applyEdits}>Apply Edits</button>
      </div>
    </div>
  );
}
