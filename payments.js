import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe("YOUR_STRIPE_SECRET_KEY");

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({ amount, currency });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment failed" });
  }
});

export default router;
