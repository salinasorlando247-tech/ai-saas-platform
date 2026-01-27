import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

export default function AnalyticsGraph() {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios.get("http://localhost:5000/analytics").then(res => {
      const posts = res.data.posts || [];
      const labels = posts.map(p => p.topic || "Untitled");
      const engagement = posts.map(p => (p.likes || 0) + (p.shares || 0) + (p.comments || 0));
      const predicted = posts.map(p => p.predictedScore || 0);

      setData({
        labels,
        datasets: [
          { label: "Actual Engagement", data: engagement, borderColor: "blue", backgroundColor: "rgba(0,0,255,0.2)" },
          { label: "Predicted Engagement", data: predicted, borderColor: "green", backgroundColor: "rgba(0,255,0,0.2)" }
        ]
      });
    });
  }, []);

  return <Line data={data} />;
}
