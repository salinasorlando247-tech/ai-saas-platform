import { useEffect,useState } from "react";
import axios from "axios";

export default function AdminDashboard(){

  const [metrics,setMetrics] = useState({});

  useEffect(()=>{
    const fetch = async ()=>{
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("/api/admin/metrics", {
        headers:{Authorization:`Bearer ${token}`}
      });
      setMetrics(res.data);
    };
    fetch();
  },[]);

  return (
    <div style={{padding:40}}>
      <h1>Investor Dashboard</h1>
      <p>Total Users: {metrics.totalUsers}</p>
      <p>Total Videos: {metrics.totalVideos}</p>
      <p>Total Revenue: ${metrics.totalRevenue}</p>
    </div>
  );
}
