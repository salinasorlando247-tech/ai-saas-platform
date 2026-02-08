import express from "express";
import { runSimulation } from "../services/simulationEngine.js";
import { calculateConfidence, honestyLevel } from "../services/confidenceService.js";
import { generateExplanation } from "../services/explainerService.js";

const router = express.Router();

router.post("/run", async (req, res) => {
  const simulation = runSimulation(req.body);

  const confidence = calculateConfidence(
    simulation,
    req.body.historicalData.sampleSize
  );

  res.json({
    simulation,
    confidence,
    honesty: honestyLevel(confidence),
    explanation: generateExplanation(req.body)
  });
});

export default router;
