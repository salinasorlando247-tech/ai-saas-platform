import express from "express";
import { writeMemory, readMemory } from "../controllers/memoryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/store", protect, writeMemory);
router.get("/:type", protect, readMemory);

export default router;
