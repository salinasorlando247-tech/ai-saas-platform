import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AnalyticsView({ refresh }) {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/analytics").then(res => setAnalytics(res.data));
  }, [refresh]);

  return (
    <div className="analytics-view">
      <h2>Analytics</h2>
      {analytics.length ? analytics.map(a => (
        <div key={a.id}>Post: {a.postId}, Engagement: {a.engagement}</div>
      )) : <p>No analytics yet.</p>}
    </div>
  );
}
