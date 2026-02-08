import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET);

export async function createCheckout(userId){

  return stripe.checkout.sessions.create({
    mode:"subscription",
    line_items:[{price:process.env.PRICE_ID,quantity:1}],
    success_url:"https://yoursite.com/success",
    cancel_url:"https://yoursite.com/cancel"
  });

}
