// backend/routes/billing.routes.js
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// ===== AUTH MIDDLEWARE =====
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ===== PLAN PRICES =====
const PLAN_PRICE = {
  starter: 4900,
  pro: 9900,
  elite: 19900
};

// ===== CREATE CHECKOUT SESSION =====
router.post("/create-checkout", auth, async (req, res) => {
  const { plan } = req.body;

  try {
    const userRes = await pool.query("SELECT email, is_beta FROM users WHERE id=$1", [req.userId]);
    const user = userRes.rows[0];

    // BETA USERS DO NOT PAY
    if (user.is_beta) {
      return res.status(403).json({ message: "Beta users do not require billing" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            recurring: { interval: "month" },
            product_data: { name: `${plan.toUpperCase()} PLAN` },
            unit_amount: PLAN_PRICE[plan],
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/dashboard?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/dashboard?cancel=true`,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create checkout session" });
  }
});

module.exports = router;
