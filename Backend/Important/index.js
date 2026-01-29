import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import aiWorker from "./aiworker.js";
import { scheduleVideo } from "./scheduler.js";
import { addCredits, getCredits, createCheckoutSession } from "./payments.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/output_videos", express.static(path.join(__dirname, "output_videos")));

const upload = multer({ dest: path.join(__dirname, "uploads/") });

// --- Video Editing Endpoint ---
app.post("/edit-video", upload.single("videoFile"), async (req, res) => {
  try {
    const { platform, editInstructions, autoPost } = req.body;
    const videoFile = req.file.path;

    const result = await aiWorker.createContent({ videoFile, editInstructions, platform });

    if (autoPost === "true" || autoPost === true) {
      scheduleVideo(result);
    }

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Video editing failed" });
  }
});

// --- Analytics Endpoint ---
app.get("/analytics", async (req, res) => {
  res.json(aiWorker.getAnalytics());
});

// --- Scheduled Videos Endpoint ---
app.get("/scheduled", (req, res) => {
  res.json(scheduleVideo.getQueue() || []);
});

// --- Credits Endpoints ---
app.get("/credits/:userId", (req, res) => {
  const userId = req.params.userId;
  res.json({ credits: getCredits(userId) });
});

app.post("/purchase-credits", async (req, res) => {
  const { userId, amount } = req.body;
  try {
    const checkoutUrl = await createCheckoutSession(userId, amount);
    res.json({ checkoutUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

app.get("/payments/success", (req, res) => {
  const { userId, amount } = req.query;
  addCredits(userId, parseInt(amount));
  res.send("Payment successful! Credits added.");
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
