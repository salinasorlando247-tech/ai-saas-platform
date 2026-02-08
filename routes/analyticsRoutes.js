import express from "express";
import {
  recordAnalytics,
  getAnalytics,
  updateAIOptimization,
} from "../controllers/analyticsController.js";

const router = express.Router();

router.post("/record", recordAnalytics);
router.get("/", getAnalytics);
router.post("/update-ai", updateAIOptimization);

export default router;
