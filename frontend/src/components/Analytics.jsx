import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await axios.get("http://localhost:5001/api/get-analytics");
      setAnalyticsData(res.data);
    };
    fetchAnalytics();
  }, []);

  if (!analyticsData.length) return <p>Loading analytics...</p>;

  // Prepare chart data
  const chartData = {
    labels: analyticsData.map((v, i) => `Video ${i + 1}`),
    datasets: [
      {
        label: "Views",
        data: analyticsData.map(v => v.views),
        borderColor: "#00ffff",
        backgroundColor: "rgba(0,255,255,0.2)"
      },
      {
        label: "Likes",
        data: analyticsData.map(v => v.likes),
        borderColor: "#ff00ff",
        backgroundColor: "rgba(255,0,255,0.2)"
      },
      {
        label: "Shares",
        data: analyticsData.map(v => v.shares),
        borderColor: "#ffff00",
        backgroundColor: "rgba(255,255,0,0.2)"
      }
    ]
  };

  return (
    <div className="analytics-dashboard">
      <h3>Holographic Analytics</h3>
      <Line data={chartData} />
      <table>
        <thead>
          <tr>
            <th>Video ID</th>
            <th>Views</th>
            <th>Likes</th>
            <th>Shares</th>
            <th>Comments</th>
            <th>Subscribers</th>
          </tr>
        </thead>
        <tbody>
          {analyticsData.map((v, i) => (
            <tr key={i}>
              <td>{v.videoID}</td>
              <td>{v.views}</td>
              <td>{v.likes}</td>
              <td>{v.shares}</td>
              <td>{v.comments}</td>
              <td>{v.subscribers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Analytics;
