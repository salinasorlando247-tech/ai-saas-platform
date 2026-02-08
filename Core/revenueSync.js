import Stripe from 'stripe'
import dotenv from 'dotenv'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const db = new Low(new JSONFile('./revenue.json'))

export async function syncRevenue(){
  await db.read()
  db.data ||= { revenue:{} }
  const subs = await stripe.subscriptions.list({limit:100})
  let totalMRR=0
  subs.data.forEach(sub=>{
    const price=sub.items.data[0].price.unit_amount
    totalMRR+=price
  })
  const balance = await stripe.balance.retrieve()
  db.data.revenue={
    total: balance.available[0].amount/100,
    mrr: totalMRR/100,
    subscriptions: subs.data.length
  }
  await db.write()
  console.log('Revenue synced')
}
