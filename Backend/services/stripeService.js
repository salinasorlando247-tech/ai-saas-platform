import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const reportUsage = async (subscriptionItemId, quantity) => {
  return stripe.usageRecords.create(subscriptionItemId, {
    quantity,
    timestamp: Math.floor(Date.now() / 1000)
  })
}
