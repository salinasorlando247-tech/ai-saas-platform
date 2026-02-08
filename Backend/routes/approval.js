import express from "express";
import {
  submitForApproval,
  getApprovalQueue,
  decideApproval
} from "../controllers/approvalController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/propose", protect, submitForApproval);
router.get("/queue", protect, getApprovalQueue);
router.post("/decide", protect, decideApproval);

export default router;
