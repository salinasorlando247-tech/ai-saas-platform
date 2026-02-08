import { useEffect, useState } from "react";
import axios from "axios";

export default function FacelessUsageMeter() {
  const [usage, setUsage] = useState(null);

  useEffect(() => {
    axios.get("/api/usage/faceless").then(res => {
      setUsage(res.data);
    });
  }, []);

  if (!usage) return null;

  const percent = (usage.usedMinutes / usage.maxMinutes) * 100;

  return (
    <div className="usage-meter">
      <h4>Faceless Usage</h4>
      <div className="bar" style={{border:"1px solid #ccc", borderRadius:"4px", width:"100%", height:"12px", overflow:"hidden", marginBottom:"5px"}}>
        <div className="fill" style={{width:`${percent}%`, height:"100%", backgroundColor:"#4caf50"}}/>
      </div>
      <p>{usage.usedMinutes} / {usage.maxMinutes} minutes used</p>
      <small>Resets on {new Date(usage.resetsAt).toLocaleDateString()}</small>
    </div>
  );
}
