import stripe from "./stripe.js";
import db from "../db.js";

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  const event = stripe.webhooks.constructEvent(
    req.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const userId = session.metadata.userId;

    await db.query(
      `INSERT INTO subscriptions
      (user_id, plan, status, stripe_customer_id, stripe_subscription_id)
      VALUES (?, 'pro', 'active', ?, ?)`,
      [userId, session.customer, session.subscription]
    );
  }

  res.json({ received: true });
};
