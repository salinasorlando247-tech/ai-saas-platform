import React, { useState, useEffect } from "react";

export default function Analytics() {

  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/schedule");
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <h2>Analytics Dashboard</h2>

      {jobs.length === 0 && <p>No scheduled posts yet.</p>}

      {jobs.map((job, index) => (
        <div key={index} className="analytics-item">
          <p><strong>Platform:</strong> {job.platform}</p>
          <p><strong>Status:</strong> {job.status}</p>
          <p><strong>Scheduled Time:</strong> {job.time}</p>
          <p><strong>Created At:</strong> {new Date(job.createdAt).toLocaleTimeString()}</p>
          {job.postedAt && <p><strong>Posted At:</strong> {new Date(job.postedAt).toLocaleTimeString()}</p>}
          <hr />
        </div>
      ))}
    </div>
  );
}
