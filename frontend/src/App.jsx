import React, { useState } from "react";
import Analytics from "./components/Analytics";
import AskAI from "./components/AskAI";
import EngagementPrediction from "./components/EngagementPrediction";
import BestPostingTime from "./components/BestPostingTime";
import CreatePost from "./components/CreatePost";
import ManualVideo from "./components/ManualVideo";
import "./styles/App.css";

function App() {
  const [aiResponse, setAiResponse] = useState("");
  const [postContent, setPostContent] = useState("");

  return (
    <div className="dashboard">

      {/* Analytics Card */}
      <div className="futuristic-card">
        <h2>Analytics</h2>
        <Analytics />
      </div>

      {/* Ask AI Card */}
      <div className="futuristic-card">
        <h2>Ask AI</h2>
        <AskAI setAiResponse={setAiResponse} />
        {aiResponse && <div className="ai-answer">{aiResponse}</div>}
      </div>

      {/* Engagement Prediction */}
      <div className="futuristic-card">
        <h2>Engagement Prediction</h2>
        <EngagementPrediction />
      </div>

      {/* Best Posting Time */}
      <div className="futuristic-card">
        <h2>Best Posting Time</h2>
        <BestPostingTime />
      </div>

      {/* Create Post */}
      <div className="futuristic-card">
        <h2>Create Post</h2>
        <textarea
          className="futuristic-input"
          placeholder="Type your post content here..."
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <button className="futuristic-btn">Submit Post</button>
      </div>

      {/* Manual Video Creation */}
      <div className="futuristic-card">
        <h2>Manual Video Creation</h2>
        <ManualVideo />
        <button className="futuristic-btn">Create Video</button>
      </div>

      {/* Industry Insights / Extra */}
      <div className="futuristic-card">
        <h2>Industry Insights</h2>
        <ul>
          <li>Top Trending AI Tools</li>
          <li>Competitor Analysis</li>
          <li>Market Trends</li>
        </ul>
      </div>

      {/* Additional futuristic widget (e.g., clock) */}
      <div className="futuristic-card">
        <h2>AI Command Clock</h2>
        <div className="clock-animation">🕒</div>
      </div>

    </div>
  );
}

export default App;
