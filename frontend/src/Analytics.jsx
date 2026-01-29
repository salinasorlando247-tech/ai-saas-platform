import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Analytics() {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/analytics");
      const labels = res.data.map((item) => item.platform);
      const views = res.data.map((item) => item.views);
      setData({
        labels,
        datasets: [
          {
            label: "Views",
            data: views,
            backgroundColor: "rgba(75,192,192,0.6)",
          },
        ],
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="analytics">
      <h2>Analytics</h2>
      <Bar data={data} />
    </div>
  );
}
