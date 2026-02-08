import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const AnalyticsPanel = ({ user }) => {
  const [analytics, setAnalytics] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(`/api/analytics/${user.id}`);
        setAnalytics(res.data);

        // Fetch predicted engagement for auto-created videos
        if (user.tier !== 'Free') {
          const predRes = await axios.get(`/api/aiVideo/predict-engagement/${user.id}`);
          setPredictions([{ label: 'Predicted Engagement Increase', value: predRes.data.predictedIncrease }]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [user.id, user.tier]);

  if (loading) return <p>Loading analytics...</p>;
  if (analytics.length === 0) return <p>No video analytics available yet.</p>;

  const chartData = {
    labels: analytics.map(a => a.title),
    datasets: [
      {
        label: 'Views',
        data: analytics.map(a => a.metrics.views),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
      },
      {
        label: 'Likes',
        data: analytics.map(a => a.metrics.likes),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
      },
    ],
  };

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Video Analytics & AI Feedback</h2>
      <p className="text-sm mb-4">
        {user.tier === 'Free'
          ? 'Basic performance metrics for your videos'
          : 'Advanced analytics with AI-predicted improvements for daily AI-created videos'}
      </p>

      <Line data={chartData} />

      {user.tier !== 'Free' && predictions.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Predicted Video Improvements</h3>
          <ul className="list-disc pl-6">
            {predictions.map((p, i) => (
              <li key={i}>
                {p.label}: <span className="font-bold">+{p.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPanel;
