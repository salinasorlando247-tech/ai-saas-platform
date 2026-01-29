import React, { useState } from "react";
import axios from "axios";

const TIERS = [
  { name: "Basic", amount: 5 },
  { name: "Pro", amount: 15 },
  { name: "Enterprise", amount: 50 },
];

export default function Payments() {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const handlePayment = async (tier) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/payment`, { amount: tier.amount });
      setPaymentStatus(`Payment for ${tier.name} initialized: ${res.data.client_secret}`);
    } catch (err) {
      console.error(err);
      setPaymentStatus("Payment failed");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
      {TIERS.map((t) => (
        <div key={t.name} style={{
          border: "1px solid #444",
          borderRadius: "12px",
          padding: "1rem",
          background: "rgba(255,255,255,0.05)"
        }}>
          <h3>{t.name}</h3>
          <p>${t.amount}/month</p>
          <button onClick={() => handlePayment(t)} style={{ marginTop: "0.5rem", padding: "0.5rem 1rem", borderRadius: "8px", border: "none", background: "#0ff", color: "#000", fontWeight: "bold", cursor: "pointer" }}>Subscribe</button>
        </div>
      ))}
      {paymentStatus && <p style={{ color: "#0ff", textAlign: "center" }}>{paymentStatus}</p>}
    </div>
  );
}
