// src/components/MetricsPanel.jsx
import React, { useEffect, useState } from "react";

export default function MetricsPanel({ token }) {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/metrics", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setMetrics(data))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <div className="panel metrics-panel">
      <h2>Metrics</h2>
      {metrics.length === 0 ? (
        <p>No metrics yet</p>
      ) : (
        metrics.map((m, i) => (
          <div key={i} className="metric-item">
            <p>{m.platform}: {m.value}</p>
          </div>
        ))
      )}
    </div>
  );
}
