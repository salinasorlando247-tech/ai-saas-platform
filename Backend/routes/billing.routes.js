const express = require("express");
const Stripe = require("stripe");
const auth = require("../middleware/authMiddleware");

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/checkout", auth, async (req,res)=>{

  const { priceId } = req.body;

  const session = await stripe.checkout.sessions.create({
    mode:"subscription",
    payment_method_types:["card"],
    line_items:[{ price:priceId, quantity:1 }],
    success_url:"https://yourdomain.com/dashboard",
    cancel_url:"https://yourdomain.com/pricing"
  });

  res.json({url:session.url});
});

module.exports = router;
