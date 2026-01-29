import React from "react";

export default function PaymentTiers() {
  const tiers = [
    { name: "Free", price: "$0", features: ["Limited AI credits"] },
    { name: "Silver", price: "$49", features: ["50 AI credits", "Priority queue"] },
    { name: "Gold", price: "$99", features: ["Unlimited AI credits", "Advanced analytics", "Full editing"] }
  ];

  return (
    <div className="tiers-container">
      {tiers.map((tier, i) => (
        <div key={i} className="tier-card">
          <h3>{tier.name}</h3>
          <p>{tier.price}</p>
          <ul>{tier.features.map((f, idx) => <li key={idx}>{f}</li>)}</ul>
          <button className="buy-btn">Buy Now</button>
        </div>
      ))}
    </div>
  );
}
