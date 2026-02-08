import { useEffect, useState } from "react";
import axios from "axios";

export default function ReferralDashboard() {
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    axios.get("/api/referrals").then(res => {
      setReferrals(res.data);
    });
  }, []);

  return (
    <div>
      <h4>Referral Earnings</h4>
      <table>
        <thead>
          <tr>
            <th>Referrer</th>
            <th>Payout ($)</th>
            <th>Available At</th>
          </tr>
        </thead>
        <tbody>
          {referrals.map((r,i)=>(
            <tr key={i}>
              <td>{r.referrerId}</td>
              <td>{r.payout.toFixed(2)}</td>
              <td>{new Date(r.availableAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
