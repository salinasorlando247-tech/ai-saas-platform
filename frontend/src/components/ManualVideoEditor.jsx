import React, { useState } from "react";
import axios from "axios";

export default function ManualVideoEditor() {
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setTrimEnd(file ? Math.floor(file.duration) : 0);
  };

  const handleSubmit = async () => {
    if (!videoFile) return;
    setStatus("Uploading...");
    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("trimStart", trimStart);
    formData.append("trimEnd", trimEnd);

    try {
      const res = await axios.post("http://localhost:5001/videos/manual", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus(`✅ Job submitted! Job ID: ${res.data.jobId}`);
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload failed");
    }
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Manual Video Editor</h2>

      <input type="file" accept="video/*" onChange={handleFileChange} />
      {previewUrl && (
        <video
          src={previewUrl}
          controls
          className="w-full mt-2 mb-2 rounded border"
        />
      )}

      <div className="flex gap-2 mb-2">
        <input
          type="number"
          min="0"
          value={trimStart}
          onChange={(e) => setTrimStart(Number(e.target.value))}
          placeholder="Start (s)"
          className="border p-1 rounded w-24"
        />
        <input
          type="number"
          min="0"
          value={trimEnd}
          onChange={(e) => setTrimEnd(Number(e.target.value))}
          placeholder="End (s)"
          className="border p-1 rounded w-24"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Video
      </button>

      {status && <p className="mt-2">{status}</p>}
    </div>
  );
}
