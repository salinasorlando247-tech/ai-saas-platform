import express from "express";
import { getUserReferralQueue } from "../services/referralQueue.service.js";

const router = express.Router();

router.get("/", (req, res) => {
  const userId = req.user.id;
  const referrals = getUserReferralQueue(userId); // returns scheduled payouts
  res.json(referrals);
});

export default router;
