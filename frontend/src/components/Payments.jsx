import React, { useState } from "react";
import axios from "axios";

export default function Payments() {
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState("Stripe");

  const pay = () => {
    axios.post("http://localhost:5000/api/payments", { amount, method })
      .then(res => alert(res.data.status));
  };

  return (
    <div>
      <h2>Payments</h2>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      <select value={method} onChange={e => setMethod(e.target.value)}>
        <option>Stripe</option>
        <option>PayPal</option>
        <option>Venmo</option>
        <option>CashApp</option>
      </select>
      <button onClick={pay}>Pay</button>
    </div>
  );
}
