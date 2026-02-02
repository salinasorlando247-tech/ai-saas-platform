import { useEffect, useState } from "react";
import axios from "axios";

export default function JobProgress(){

  const [jobs,setJobs] = useState([]);

  useEffect(()=>{

    const fetchJobs = async ()=>{
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/videos/status",{
        headers:{Authorization:`Bearer ${token}`}
      });

      setJobs(res.data);
    };

    fetchJobs();
    setInterval(fetchJobs,3000);

  },[]);

  return (
    <div>
      <h2>Processing Queue</h2>

      {jobs.map(j=>(
        <div key={j.id}>
          Video {j.id} — {j.progress}%
        </div>
      ))}
    </div>
  );
}
