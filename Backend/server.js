import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";

import scheduler from "./scheduler.js";
import payments from "./payments.js";
import viralScore from "./viralScore.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- Payments Route ---
app.post("/api/payments", payments);

// --- Scheduler Route (example, adjust per your logic) ---
app.get("/api/scheduler", scheduler);

// --- Viral Score Route ---
app.get("/api/viralScore", viralScore);

// --- Default Route ---
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
