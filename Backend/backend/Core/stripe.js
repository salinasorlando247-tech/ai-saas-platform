import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
})

export async function createCheckoutSession(email, tier) {

  const priceId = getPriceId(tier)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',

    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],

    customer_email: email,

    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel'
  })

  return session.url
}

function getPriceId(tier) {
  switch (tier) {
    case 'starter':
      return 'price_STARTER_ID'
    case 'pro':
      return 'price_PRO_ID'
    case 'enterprise':
      return 'price_ENTERPRISE_ID'
    default:
      return 'price_STARTER_ID'
  }
}
