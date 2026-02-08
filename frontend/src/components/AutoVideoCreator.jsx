import React, { useState } from "react";

export default function AutoVideoCreator() {
  const [prompt, setPrompt] = useState("");
  const [status, setStatus] = useState("");

  const generateVideo = () => {
    setStatus("AI generating video...");
  };

  const approveVideo = () => {
    setStatus("AI approved — Scheduling optimized post...");
  };

  const regenerateVideo = () => {
    setStatus("AI regenerating with analytics improvements...");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">AI Video Creator</h2>

      <textarea
        placeholder="Enter prompt or script"
        className="w-full p-2 border rounded"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex gap-3 mt-4">
        <button onClick={generateVideo} className="px-3 py-2 bg-purple-700 text-white rounded">
          Generate Video
        </button>

        <button onClick={approveVideo} className="px-3 py-2 bg-green-600 text-white rounded">
          I Like This Video
        </button>

        <button onClick={regenerateVideo} className="px-3 py-2 bg-red-600 text-white rounded">
          Regenerate
        </button>
      </div>

      <p className="mt-4 text-gray-600">{status}</p>
    </div>
  );
}
