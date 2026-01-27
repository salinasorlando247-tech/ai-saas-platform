import React from "react";

const EngagementPrediction = () => {
  const handleClick = () => {
    alert("Engagement Prediction clicked!");
    // connect to backend API for predictions here
  };

  return <button onClick={handleClick}>Run Engagement Prediction</button>;
};

export default EngagementPrediction;
