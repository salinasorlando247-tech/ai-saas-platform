import express from "express";
import { createCheckout } from "./billingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/checkout", authMiddleware, createCheckout);

export default router;
