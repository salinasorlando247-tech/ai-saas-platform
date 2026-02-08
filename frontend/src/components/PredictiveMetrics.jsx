import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

export default function PredictiveMetrics({ videoId }) {
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      const res = await api.get(`/analytics/predict/${videoId}`);
      setPrediction(res.data);
    };
    fetchPrediction();
  }, [videoId]);

  if(!prediction) return <div>Loading predictions...</div>;

  return (
    <div className="p-4 border rounded bg-gray-50">
      <h3 className="text-lg font-bold">Predicted Performance</h3>
      <p>Score: {prediction.score}</p>
      <p>Predicted Reach: {prediction.predictedReach}</p>
      <p>Best Hour to Post: {prediction.bestPostHour}:00</p>
    </div>
  );
}
