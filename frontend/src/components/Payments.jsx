import React, { useState } from "react";

const Payments = ({ plan, price, handleCheckout }) => {
  const [loading, setLoading] = useState(false);

  const onCheckout = async () => {
    setLoading(true);
    try {
      await handleCheckout(plan);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-card">
      <h2 className="payment-plan">{plan}</h2>
      <p className="payment-price">${price}/month</p>
      <button className="payment-button" onClick={onCheckout} disabled={loading}>
        {loading ? "Processing..." : "Subscribe"}
      </button>
    </div>
  );
};

export default Payments;
