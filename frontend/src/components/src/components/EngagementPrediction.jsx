import React from "react";
import axios from "axios";

function EngagementPrediction() {

  const simulate = async () => {
    try {
      await axios.post("http://localhost:5000/api/analytics/update", {
        postId: Date.now(),
        likes: Math.floor(Math.random() * 800),
        shares: Math.floor(Math.random() * 300),
        comments: Math.floor(Math.random() * 200)
      });

      alert("Analytics generated");

    } catch (err) {
      console.error(err);
      alert("Analytics failed");
    }
  };

  return (
    <div>
      <p>Generate simulated AI engagement</p>

      <button
        className="futuristic-btn"
        onClick={simulate}
      >
        Generate Engagement
      </button>
    </div>
  );
}

export default EngagementPrediction;
