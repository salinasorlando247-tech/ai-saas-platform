import express from 'express'
import Stripe from 'stripe'
import dotenv from 'dotenv'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const router = express.Router()

const adapter = new JSONFile('./users.json')
const db = new Low(adapter)

router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {

  const sig = req.headers['stripe-signature']

  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {

    const session = event.data.object

    await db.read()

    const user = db.data.users.find(u => u.email === session.customer_email)

    if (user) {
      user.tier = 'pro'
      await db.write()
      console.log('User upgraded to PRO:', user.email)
    }
  }

  res.json({ received: true })
})

export default router
