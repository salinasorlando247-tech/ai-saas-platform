import { useEffect, useState } from "react";
import { getVideoMetrics } from "../../services/api";
import { Bar } from "react-chartjs-2";

const Analytics = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchMetrics = async () => {
      const res = await getVideoMetrics("demoVideoId");
      setData({
        labels: ["Views", "Likes", "Shares", "Comments"],
        datasets: [{ label: "Video Metrics", data: [res.data.views, res.data.likes, res.data.shares, res.data.comments], backgroundColor: "rgba(54, 162, 235, 0.5)" }],
      });
    };
    fetchMetrics();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2">Analytics</h2>
      <Bar data={data} />
    </div>
  );
};

export default Analytics;
