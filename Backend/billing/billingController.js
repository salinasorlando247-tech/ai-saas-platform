import stripe from "./stripe.js";
import db from "../db.js";

export const createCheckout = async (req, res) => {
  const { priceId } = req.body;
  const userId = req.user.id;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.FRONTEND_URL}/success`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    metadata: { userId }
  });

  res.json({ url: session.url });
};
