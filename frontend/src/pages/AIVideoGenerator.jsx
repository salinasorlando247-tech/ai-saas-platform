import React, { useState } from "react";
import axios from "../../utils/api";

const AIVideoGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoURL, setVideoURL] = useState("");

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await axios.post("/ai/video", { prompt });
      setVideoURL(res.data.url); // backend returns video URL
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">AI Video Generator</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your video script or idea..."
        className="w-full p-3 border rounded mb-3"
      />
      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Video"}
      </button>

      {videoURL && (
        <video
          src={videoURL}
          controls
          className="mt-4 w-full rounded shadow"
        />
      )}
    </div>
  );
};

export default AIVideoGenerator;
