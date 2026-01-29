import React, { useState } from "react";

export default function Payments() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("stripe");

  const handlePayment = () => {
    alert(`Processing $${amount} via ${method.toUpperCase()} (simulation)`);
    // Here you would call backend API for real payment
  };

  return (
    <div className="payments">
      <h2>Credits / Payment</h2>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <div className="payment-methods">
        <button
          className={method === "stripe" ? "active" : ""}
          onClick={() => setMethod("stripe")}
        >
          Stripe
        </button>
        <button
          className={method === "paypal" ? "active" : ""}
          onClick={() => setMethod("paypal")}
        >
          PayPal
        </button>
        <button
          className={method === "venmo" ? "active" : ""}
          onClick={() => setMethod("venmo")}
        >
          Venmo
        </button>
        <button
          className={method === "cashapp" ? "active" : ""}
          onClick={() => setMethod("cashapp")}
        >
          Cash App
        </button>
        <button
          className={method === "card" ? "active" : ""}
          onClick={() => setMethod("card")}
        >
          Credit/Debit
        </button>
      </div>

      <button onClick={handlePayment}>Pay / Add Credits</button>
    </div>
  );
}
