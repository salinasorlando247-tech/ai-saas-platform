import express from "express";
import { generateFacelessVideo } from "../controllers/facelessVideoController.js";

const router = express.Router();

// POST: Create a faceless AI video
router.post("/create", generateFacelessVideo);

export default router;
