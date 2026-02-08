import User from "../models/User.js";

export const checkSubscription = async (req, res, next) => {
  const user = req.user;
  if (!user.stripeSubscriptionId) {
    return res.status(402).json({ error: "No active subscription" });
  }

  // Optionally fetch subscription status from Stripe
  // const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
  // if(subscription.status !== "active") return res.status(402)...

  next();
};
