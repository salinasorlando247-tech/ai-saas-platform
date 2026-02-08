import React, { useState } from "react";
import axios from "axios";
import { API_BASE } from "../config";

export default function AiPromptModal({ onClose }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const askAI = async () => {
    const res = await axios.post(`${API_BASE}/ai-video`, { title: "AI Idea", description: "", prompt, platform: "YouTube" });
    setResponse(res.data.path);
  };

  return (
    <div className="modal">
      <h3>Ask AI</h3>
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ask AI to generate ideas, scripts, or edits..." />
      <button onClick={askAI}>Submit</button>
      <button onClick={onClose}>Close</button>
      {response && <video src={response} controls />}
    </div>
  );
}
