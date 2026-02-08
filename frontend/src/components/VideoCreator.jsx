import React, { useState } from "react";
import { createFacelessVideo } from "../services/facelessService";

export default function VideoCreator({ user }) {
  const [script, setScript] = useState("");
  const [videoLength, setVideoLength] = useState(2); // minutes
  const [preview, setPreview] = useState(null);

  const handleGenerate = async () => {
    try {
      const result = await createFacelessVideo(user._id, script, { videoLength });

      setPreview(result);

      if (!result.fullRenderAvailable) {
        alert("Full faceless video export requires $5/month unlock.");
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      <h2>ForgeAI Faceless Video Creator</h2>
      <textarea
        placeholder="Enter your script..."
        value={script}
        onChange={(e) => setScript(e.target.value)}
      />
      <select value={videoLength} onChange={(e) => setVideoLength(Number(e.target.value))}>
        <option value={1}>1 min</option>
        <option value={2}>2 min</option>
        <option value={5}>5 min</option>
      </select>
      <button onClick={handleGenerate}>Generate Faceless Video</button>

      {preview && (
        <div>
          <h3>Preview</h3>
          <div>Storyboard: {preview.storyboard}</div>
          <div>Thumbnail: {preview.thumbnail}</div>
          <div>Voice Snippet: {preview.voiceSnippet}</div>
          {preview.fullRender && <div>Full Video URL: {preview.fullRender}</div>}
        </div>
      )}
    </div>
  );
}
