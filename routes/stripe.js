import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession(userId, priceId) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${process.env.CLIENT_URL}/dashboard?success=true`,
    cancel_url: `${process.env.CLIENT_URL}/dashboard?canceled=true`,
    metadata: { userId }
  });
  return session;
}

export async function handleStripeWebhook(req) {
  const event = req.body;
  switch(event.type) {
    case 'invoice.payment_failed':
      // suspend account logic
      break;
    case 'customer.subscription.created':
      // activate subscription
      break;
  }
}
