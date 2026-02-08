// src/components/SchedulerPanel.jsx
import React, { useEffect, useState } from "react";

export default function SchedulerPanel({ token }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/scheduler", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <div className="panel scheduler-panel">
      <h2>Scheduled Posts</h2>
      {posts.length === 0 ? <p>No posts scheduled</p> : posts.map(p => (
        <div key={p.id} className="post-item">
          <p>{p.platform}: {p.content}</p>
          <p>Time: {new Date(p.schedule_time).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
