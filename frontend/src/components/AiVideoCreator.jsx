import React, { useState } from "react";
import axios from "axios";

export default function AIVideoCreator() {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);

  const handleSubmit = async () => {
    if (!prompt) return;
    setStatus("Generating AI video...");
    try {
      const res = await axios.post("http://localhost:5001/videos/ai", { prompt });
      setStatus(`✅ Job submitted! Job ID: ${res.data.jobId}`);
      setVideoUrl(res.data.previewUrl || null);
    } catch (err) {
      console.error(err);
      setStatus("❌ AI generation failed");
    }
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-xl mx-auto mt-4">
      <h2 className="text-xl font-bold mb-2">AI Video Creator</h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter AI video prompt..."
        className="w-full border p-2 rounded mb-2"
        rows={4}
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Generate Video
      </button>

      {status && <p className="mt-2">{status}</p>}

      {videoUrl && (
        <video
          src={videoUrl}
          controls
          className="w-full mt-2 rounded border"
        />
      )}
    </div>
  );
}
