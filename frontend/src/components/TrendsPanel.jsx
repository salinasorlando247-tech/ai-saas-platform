// src/components/TrendsPanel.jsx
import React, { useEffect, useState } from "react";

export default function TrendsPanel({ token }) {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/trends", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setTrends(data))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <div className="panel trends-panel">
      <h2>Trends</h2>
      {trends.length === 0 ? <p>No trends yet</p> : trends.map((t,i) => (
        <div key={i}>{t.platform}: {t.trend}</div>
      ))}
    </div>
  );
}
