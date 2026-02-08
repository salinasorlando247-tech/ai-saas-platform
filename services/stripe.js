import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function createStripeSession(price, credits){
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card","cashapp","venmo"],
    mode:"payment",
    line_items:[{
      price_data:{
        currency:"usd",
        unit_amount: price*100,
        product_data:{ name:`${credits} AI Credits` }
      },
      quantity:1
    }],
    success_url: `${process.env.FRONTEND_URL}/success`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    metadata:{ credits }
  })
  return session.url
}
