// /frontend/src/components/DashboardAnalytics.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import Analytics3DChart from './Analytics3DChart';

export default function DashboardAnalytics({ clientId }) {
  const [analytics, setAnalytics] = useState(null);

  const fetchAnalytics = async () => {
    const { data } = await axios.get(`/api/analytics/dashboard/${clientId}`);
    setAnalytics(data);
  };

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 15000);
    return () => clearInterval(interval);
  }, [clientId]);

  if (!analytics) return <div>Loading analytics...</div>;

  return (
    <div className="dashboard-analytics">
      <h2>ForgeAI Cheat-Code Analytics</h2>

      <div className="platform-performance">
        {Object.entries(analytics.performanceData).map(([platform, data]) => (
          <div key={platform}>
            <h3>{platform}</h3>
            <p>Views: {data.views}</p>
            <p>Engagement: {data.engagement}</p>
            <p>Predicted Reach: {analytics.predictions[platform]?.predictedReach}</p>
          </div>
        ))}
      </div>

      <Canvas style={{ height: '400px' }}>
        <Analytics3DChart data={analytics.performanceData} />
      </Canvas>

      <div className="top-player-analysis">
        <h3>Top Player Insights</h3>
        {analytics.competitors.map((comp) => (
          <div key={comp.id}>
            <p>Name: {comp.name}</p>
            <p>Engagement Ratio: {comp.engagementRatio}</p>
            <p>Best Performing Content: {comp.topContent}</p>
          </div>
        ))}
      </div>

      <div className="cheat-code-suggestions">
        <h3>AI Cheat-Code Recommendations</h3>
        {Object.entries(analytics.predictions).map(([platform, pred]) => (
          <div key={platform}>
            <p><strong>{platform}</strong></p>
            <p>Optimal Post Time: {new Date(pred.optimalPostTime).toLocaleString()}</p>
            <p>Predicted Reach: {pred.predictedReach}</p>
            <p>Engagement Score: {pred.engagementScore.toFixed(2)}</p>
            <p>Revenue Potential: ${pred.revenuePotential.toFixed(2)}</p>
            <p>{pred.outperformScore > 1 ? 'You can outperform top player here!' : 'Keep improving strategy'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
