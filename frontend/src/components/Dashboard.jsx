import { useEffect, useState } from "react";
import axios from "axios";
import FacelessUsageMeter from "./FacelessUsageMeter.jsx";

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    // Load AI insights
    axios.get("/api/analytics").then(res => setAnalytics(res.data));

    // Load AI scheduler recommendations
    axios.get("/api/scheduler/recommend").then(res => setSchedule(res.data));

    // Load referral earnings
    axios.get("/api/referrals").then(res => setReferrals(res.data));
  }, []);

  if (!analytics) return <p>Loading Dashboard...</p>;

  return (
    <div className="dashboard">
      <h2>ForgeAI Dashboard</h2>

      {/* Faceless Usage */}
      <FacelessUsageMeter />

      {/* AI Insights */}
      <section>
        <h3>AI Recommendations & Insights</h3>
        <ul>
          {analytics.insights.map((insight, idx) => (
            <li key={idx}>
              <strong>{insight.type}:</strong> {insight.message}{" "}
              {insight.fix ? <em>Fix: {insight.fix}</em> : null}
            </li>
          ))}
        </ul>
        <p>
          <strong>Revenue Potential Score:</strong> {analytics.monetization.revenuePotentialScore.toFixed(2)}{" "}
          <br />
          <strong>Referral Impact:</strong> ${analytics.monetization.referralImpact.toFixed(2)}
        </p>
      </section>

      {/* Scheduler Recommendations */}
      <section>
        <h3>Recommended Posting Times</h3>
        <table>
          <thead>
            <tr>
              <th>Platform</th>
              <th>Recommended Time</th>
              <th>Reason</th>
              <th>Warning</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((s, idx) => (
              <tr key={idx}>
                <td>{s.platform}</td>
                <td>{s.recommendedTime}</td>
                <td>{s.reason}</td>
                <td style={{color:"red"}}>{s.warning || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Referral Earnings */}
      <section>
        <h3>Referral Earnings (Pending)</h3>
        <table>
          <thead>
            <tr>
              <th>Referrer</th>
              <th>Payout ($)</th>
              <th>Available At</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((r, idx) => (
              <tr key={idx}>
                <td>{r.referrerId}</td>
                <td>{r.payout.toFixed(2)}</td>
                <td>{new Date(r.availableAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
