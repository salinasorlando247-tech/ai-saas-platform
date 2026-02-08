import express from "express";
import { createSubscriptionHandler, stripeWebhookHandler } from "../controllers/subscriptionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect(["client"]), createSubscriptionHandler);
router.post("/webhook", stripeWebhookHandler); // public endpoint

export default router;
