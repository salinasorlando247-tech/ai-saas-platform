import React, { useState } from "react";
import axios from "axios";

const AutoVideoCreator = () => {
  const [prompt, setPrompt] = useState("");
  const [industry, setIndustry] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [videoMeta, setVideoMeta] = useState({});

  const generateAI = async () => {
    const res = await axios.post("http://localhost:5001/api/create-ai-video", {
      prompt,
      industry
    });
    setVideoURL(res.data.videoUrl);
    setVideoMeta(res.data.videoMeta);
  };

  const likeVideo = async () => {
    // Auto-schedule publish
    await axios.post("http://localhost:5001/api/publish-video", {
      videoURL,
      day: "Friday", // example default, could be client selected
      clientID: "client_123",
      videoMeta
    });
    alert("Video liked and scheduled at best time!");
  };

  return (
    <div className="auto-video-creator">
      <h3>AI Video Creator</h3>
      <input
        type="text"
        placeholder="Prompt for AI"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <input
        type="text"
        placeholder="Client Industry"
        value={industry}
        onChange={e => setIndustry(e.target.value)}
      />
      <button onClick={generateAI}>Generate Video</button>
      {videoURL && (
        <div>
          <video src={videoURL} controls width="400" />
          <button onClick={likeVideo}>I Like This Video</button>
          <button onClick={() => alert("Regenerating AI video...")}>Dislike / Change Video</button>
        </div>
      )}
    </div>
  );
};

export default AutoVideoCreator;
