import React, { useEffect, useState } from "react";
import axios from "axios";

function Analytics() {
  const [data, setData] = useState([]);

  const fetchAnalytics = async () => {
    const res = await axios.get("http://localhost:5000/api/analytics");
    setData(res.data);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div>
      {data.length === 0 && <p>No analytics data yet</p>}

      {data.map((item, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <strong>Post ID:</strong> {item.postId}<br />
          ❤️ Likes: {item.likes} | 🔁 Shares: {item.shares} | 💬 Comments: {item.comments}
        </div>
      ))}

      <button
        className="futuristic-btn"
        onClick={fetchAnalytics}
      >
        Refresh Data
      </button>
    </div>
  );
}

export default Analytics;
