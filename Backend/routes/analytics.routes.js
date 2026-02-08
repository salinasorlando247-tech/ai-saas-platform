import express from "express";
import { generateInsights, monetizationInsights } from "../services/analyticsService.js";

const router = express.Router();

router.get("/", (req, res) => {
  const user = req.user;
  const userMetrics = req.userMetrics; // precomputed metrics per user

  const insights = generateInsights(userMetrics, user);
  const monetization = monetizationInsights(userMetrics, user);

  res.json({ insights, monetization });
});

export default router;
