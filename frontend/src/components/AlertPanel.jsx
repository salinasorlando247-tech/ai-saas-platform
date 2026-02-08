import { useEffect, useState } from "react";
import axios from "axios";

export default function AlertPanel({ userTier }) {
  const [usage, setUsage] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Poll usage every 10s
    const usageInterval = setInterval(() => {
      axios.get("/api/usage/faceless").then(res => setUsage(res.data));
    }, 10000);

    // Poll referrals every 10s
    const referralInterval = setInterval(() => {
      axios.get("/api/referrals").then(res => setReferrals(res.data));
    }, 10000);

    return () => {
      clearInterval(usageInterval);
      clearInterval(referralInterval);
    };
  }, []);

  // Generate alerts
  useEffect(() => {
    const newAlerts = [];

    if (userTier === "free" && usage) {
      if (!usage.unlocked) {
        newAlerts.push({
          type: "info",
          message: "Unlock faceless videos for $5/month to start creating!"
        });
      } else if (usage.remainingMinutes <= 0) {
        newAlerts.push({
          type: "warning",
          message: "You have reached your monthly faceless video limit."
        });
      } else if (usage.remainingMinutes <= 30) {
        newAlerts.push({
          type: "warning",
          message: `Only ${usage.remainingMinutes} faceless minutes left this month.`
        });
      }
    }

    referrals.forEach(r => {
      if (Date.now() >= r.availableAt && !r.notified) {
        newAlerts.push({
          type: "success",
          message: `Referral payout of $${r.payout.toFixed(2)} is now available!`
        });
        r.notified = true; // prevent repeated alerts
      }
    });

    setAlerts(newAlerts);
  }, [usage, referrals]);

  return (
    <div style={{position:"fixed", top:"10px", right:"10px", width:"300px", zIndex:1000}}>
      {alerts.map((alert, idx) => {
        const bgColor = alert.type === "success" ? "#4caf50" :
                        alert.type === "warning" ? "#ff9800" :
                        "#2196f3";
        return (
          <div key={idx} style={{
            marginBottom:"10px",
            padding:"10px",
            borderRadius:"6px",
            color:"#fff",
            backgroundColor: bgColor,
            boxShadow:"0 2px 6px rgba(0,0,0,0.3)"
          }}>
            {alert.message}
          </div>
        );
      })}
    </div>
  );
}
