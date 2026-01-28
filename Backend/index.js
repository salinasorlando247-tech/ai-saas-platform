// index.js
import express from "express";
import cors from "cors";
import Stripe from "stripe";
import dotenv from "dotenv";
import aiWorker from "./aiworker.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ----------------------
// Health Check
// ----------------------
app.get("/", (req, res) => {
  res.json({ status: "AI SaaS Backend Running" });
});

// ----------------------
// Stripe Test Endpoint
// ----------------------
app.get("/api/stripe-test", async (req, res) => {
  try {
    const balance = await stripe.balance.retrieve();
    res.json(balance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// AI Chat Endpoint
// ----------------------
app.post("/api/ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const reply = await aiWorker(prompt);
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----------------------
// Start Server
// ----------------------
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
