import {
  createCustomer,
  createSubscription,
  retrieveSubscription,
} from "../services/stripeService.js";
import User from "../models/User.js";

export const createSubscriptionHandler = async (req, res) => {
  try {
    const user = req.user;
    if (!user.stripeCustomerId) {
      const customer = await createCustomer(user.email, user.name);
      user.stripeCustomerId = customer.id;
      await user.save();
    }

    const subscription = await createSubscription(user.stripeCustomerId, req.body.priceId);
    user.stripeSubscriptionId = subscription.id;
    await user.save();

    res.status(200).json({ subscription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Subscription creation failed" });
  }
};

// Stripe Webhook Handler
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhookHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "invoice.payment_succeeded":
      // handle successful payment
      break;
    case "invoice.payment_failed":
      // suspend account or notify user
      break;
    case "customer.subscription.deleted":
      // subscription canceled
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
