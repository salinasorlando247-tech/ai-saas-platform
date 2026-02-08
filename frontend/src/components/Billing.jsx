import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const plans = [
  {
    name: "Starter",
    price: 49,
    id: "starter",
    features: ["100 videos/month", "HD exports", "Scheduling", "Captions AI"]
  },
  {
    name: "Pro",
    price: 99,
    id: "pro",
    features: ["500 videos/month", "4K exports", "Bulk generation", "Priority queue"]
  },
  {
    name: "Elite",
    price: 199,
    id: "elite",
    features: ["Unlimited videos", "Fastest queue", "White-label", "API access"]
  }
];

const Billing = ({ token, isBeta }) => {

  const subscribe = async (plan) => {
    if (isBeta) {
      alert("You are on FREE Beta access.");
      return;
    }

    const stripe = await stripePromise;

    const res = await axios.post(
      "/api/billing/create-checkout",
      { plan },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    await stripe.redirectToCheckout({ sessionId: res.data.id });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Pricing Plans</h2>

      {isBeta && (
        <div style={{ color: "green", fontWeight: "bold", marginBottom: "20px" }}>
          ✅ Beta Access — You Have Full Platform Access FREE
        </div>
      )}

      <div style={{ display: "flex", gap: "20px" }}>
        {plans.map((p) => (
          <div key={p.id} style={{ border: "1px solid #ddd", padding: "20px", width: "250px" }}>
            <h3>{p.name}</h3>
            <h1>${p.price}/mo</h1>

            <ul>
              {p.features.map(f => <li key={f}>{f}</li>)}
            </ul>

            <button onClick={() => subscribe(p.id)}>
              {isBeta ? "Beta Active" : "Subscribe"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Billing;
