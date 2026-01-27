import express from "express";
import fs from "fs";
import path from "path";
import { predictPerformance } from "../predictor.js";

const router = express.Router();
const analyticsFile = path.join(process.cwd(), "backend", "analytics.json");

router.get("/", (req, res) => {
  let data = { posts: [], metrics: [] };
  if (fs.existsSync(analyticsFile)) {
    data = JSON.parse(fs.readFileSync(analyticsFile, "utf-8"));
  }

  data.posts = data.posts.map(post => ({
    ...post,
    predictedScore: predictPerformance(post),
  }));

  res.json(data);
});

export default router;
