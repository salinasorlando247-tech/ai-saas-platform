import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Analytics() {
  const [data, setData] = useState({ labels: [], views: [] });

  useEffect(() => {
    axios.get("http://localhost:5000/api/analytics").then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Analytics (Views per Day)</h2>
      {data.labels.map((label, i) => (
        <div key={i}>{label}: {data.views[i]}</div>
      ))}
    </div>
  );
}
