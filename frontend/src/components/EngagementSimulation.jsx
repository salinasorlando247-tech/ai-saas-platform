import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function EngagementSimulation({ plannedPost }) {
  const [simResult,setSimResult] = useState(null);

  useEffect(() => {
    const runSim = async () => {
      const res = await api.post('/analytics/simulate', plannedPost);
      setSimResult(res.data);
    };
    runSim();
  }, [plannedPost]);

  if(!simResult) return <div>Simulating engagement...</div>;
  return (
    <div>
      <p>Expected Likes: {simResult.likes}</p>
      <p>Expected Shares: {simResult.shares}</p>
      <p>Predicted Virality: {simResult.virality}%</p>
    </div>
  );
}
