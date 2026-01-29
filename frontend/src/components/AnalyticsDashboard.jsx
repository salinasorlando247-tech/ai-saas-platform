import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState({});

  const fetchAnalytics = async () => {
    const res = await axios.get("http://localhost:5000/api/analytics");
    setAnalytics(res.data);
  };

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="analytics-container">
      {Object.entries(analytics).map(([id, data]) => (
        <div key={id} className="analytics-card">
          <h3>Video {id}</h3>
          <Line
            data={{
              labels: ["Views", "Likes", "Comments", "Shares"],
              datasets: [{ label: "Engagement Metrics", data: [data.views, data.likes, data.comments, data.shares], borderColor: "lime", backgroundColor: "rgba(0,255,0,0.2)" }]
            }}
          />
        </div>
      ))}
    </div>
  );
}
