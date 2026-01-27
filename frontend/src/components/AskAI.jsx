import React, { useState } from "react";
import axios from "axios";

function AskAI({ setAiResponse }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!prompt) return alert("Enter a prompt");

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/askai", {
        prompt: prompt
      });

      setAiResponse(res.data.response);

    } catch (err) {
      console.error(err);
      alert("AI request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        className="futuristic-input"
        placeholder="Ask the AI..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        className="futuristic-btn"
        onClick={askAI}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>
    </div>
  );
}

export default AskAI;
