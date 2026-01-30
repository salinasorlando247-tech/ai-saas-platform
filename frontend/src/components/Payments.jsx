import React, { useState } from "react";

export default function Payments() {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handlePayment = async () => {
    if (!amount) return alert("Enter an amount");

    try {
      setStatus("Processing...");
      const res = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(`Payment successful! Transaction ID: ${data.transactionId}`);
      } else {
        setStatus(`Payment failed: ${data.error}`);
      }
    } catch (err) {
      setStatus("Payment error: " + err.message);
    }
  };

  return (
    <div className="card">
      <h2>Payments / Upgrade Plan</h2>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
      />

      <button onClick={handlePayment}>Pay Now</button>

      {status && <p style={{ marginTop: "10px" }}>{status}</p>}
    </div>
  );
}
