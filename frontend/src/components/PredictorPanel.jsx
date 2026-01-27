import React, { useState } from "react";
import axios from "axios";

export default function PredictorPanel() {
  const [prediction, setPrediction] = useState(null);

  const runPrediction = async () => {
    const res = await axios.get("http://localhost:5000/api/predict");
    setPrediction(res.data);
  };

  return (
    <div>
      <h3>AI Predictor</h3>
      <button onClick={runPrediction}>Run Prediction</button>

      {prediction && (
        <div>
          Expected Views: {prediction.expectedViews}
          <br />
          Confidence: {prediction.confidence}
        </div>
      )}
    </div>
  );
}
