import express from 'express';
import Stripe from 'stripe';
import Subscription from '../models/Subscription.js';
import User from '../models/User.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create checkout session
router.post('/checkout', async (req,res) => {
  const { userId, plan } = req.body;
  const user = await User.findById(userId);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: user.email,
    line_items: [{ price: process.env[`PRICE_${plan.toUpperCase()}`], quantity: 1 }],
    mode: 'subscription',
    success_url: process.env.FRONTEND_URL + '/success',
    cancel_url: process.env.FRONTEND_URL + '/cancel'
  });
  res.json({ url: session.url });
});

// Webhook to track subscription
router.post('/webhook', express.raw({ type: 'application/json' }), async (req,res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try { event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET); }
  catch(err){ return res.status(400).send(`Webhook Error: ${err.message}`); }

  if(event.type === 'checkout.session.completed'){
    const session = event.data.object;
    const user = await User.findOne({ email: session.customer_email });
    await Subscription.create({ userId: user._id, plan: session.metadata.plan, stripeCustomerId: session.customer, stripeSubscriptionId: session.subscription });
  }

  res.json({ received: true });
});

export default router;
