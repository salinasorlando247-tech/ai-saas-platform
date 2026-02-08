import express from "express";
import { recommendSchedule } from "../services/scheduler.service.js";

const router = express.Router();

router.get("/recommend", (req, res) => {
  const user = req.user;
  const userMetrics = req.userMetrics;

  const schedule = recommendSchedule(userMetrics, user);
  res.json(schedule);
});

export default router;
