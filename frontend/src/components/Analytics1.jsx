import React, { useEffect, useState } from "react";

export default function Analytics() {

  const [stats, setStats] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/api/schedule")
      .then(res => res.json())
      .then(data => setStats(data));

  }, []);

  return (
    <div className="card">

      <h2>Analytics Dashboard</h2>

      {stats.length === 0 && <p>No data yet</p>}

      {stats.map((job, index) => (
        <div key={index}>
          <p>Platform: {job.platform}</p>
          <p>Status: {job.status}</p>
          <p>Time: {job.time}</p>
          <hr />
        </div>
      ))}

    </div>
  );
}
