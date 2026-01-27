import express from "express";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";
import Stripe from "stripe";
import { processJobs } from "./aiWorker.js";
import { createCheckoutSession } from "./stripe.js";
import { runPipeline } from "./pipelineEngine.js";
import authRoutes from "./auth/authRoutes.js";
import { verifyToken } from "./auth/jwt.js";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

// -------------------- SUSPENDED MIDDLEWARE --------------------
app.use((req, res, next) => {
  if (!req.headers.email) return next();
  const db = JSON.parse(fs.readFileSync("./users.json"));
  const user = db.users.find(u => u.email === req.headers.email);
  if (!user) return next();
  if (user.suspended) return res.status(403).json({ error: "Account suspended" });
  next();
});

// -------------------- HEALTH --------------------
app.get("/", (req, res) => res.send("AI Platform Running"));

// -------------------- AUTH ROUTES --------------------
app.use("/api/auth", authRoutes);

// -------------------- PIPELINE --------------------
app.post("/api/pipeline", verifyToken, async (req, res) => {
  const { prompt } = req.body;
  const result = await runPipeline(prompt, req.user);
  res.json(result);
});

// -------------------- STRIPE CHECKOUT --------------------
app.post("/api/checkout", createCheckoutSession);

// -------------------- STRIPE WEBHOOK --------------------
app.post("/api/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return res.status(400).send("Webhook Error");
  }

  if (event.type === "checkout.session.completed") {
    const email = event.data.object.customer_email;
    const usersDB = JSON.parse(fs.readFileSync("./users.json"));
    if (!usersDB.users.find(u => u.email === email)) {
      usersDB.users.push({
        email,
        tier: "starter",
        role: "user",
        suspended: false
      });
      fs.writeFileSync("./users.json", JSON.stringify(usersDB, null, 2));
    }
  }

  res.json({ received: true });
});

// -------------------- JOB LOOP --------------------
setInterval(processJobs, 3000);

app.listen(process.env.PORT, () => console.log("Server running on port", process.env.PORT));
