import express from "express";
import { getTopPlayers } from "../controllers/competitorController.js";

const router = express.Router();
router.get("/topPlayers", getTopPlayers);

export default router;
