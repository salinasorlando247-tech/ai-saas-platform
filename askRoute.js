// Backend/askRoute.js
import express from "express";
import { generateAI } from "./aiEngine.js";

const router = express.Router();

router.post("/ask", async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ error: "Question required" });

  try {
    const answer = await generateAI(question);
    res.json({ answer });
  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({ answer: "Error generating AI response" });
  }
});

export default router;
