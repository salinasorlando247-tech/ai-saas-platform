// routes/videos.js
import express from "express";
import { pool } from "../db.js";
import fs from "fs";
import path from "path";

const router = express.Router();
const VIDEO_DIR = path.resolve("./videos");

// Upload video manually
router.post("/upload", async (req, res) => {
  try {
    // You would normally use multer or similar here
    const { filename, content } = req.body; // For demo
    const filePath = path.join(VIDEO_DIR, filename);
    fs.writeFileSync(filePath, Buffer.from(content, "base64"));
    
    await pool.query("INSERT INTO videos (filename, type) VALUES (?, ?)", [
      filename,
      "manual",
    ]);

    res.json({ message: "Video uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// Generate video via AI
router.post("/ai-create", async (req, res) => {
  try {
    const { title, script } = req.body;
    const aiFilename = `${Date.now()}-ai.mp4`;
    const filePath = path.join(VIDEO_DIR, aiFilename);

    // Placeholder: integrate your AI video generation logic here
    fs.writeFileSync(filePath, Buffer.from(`AI Video: ${script}`));

    await pool.query("INSERT INTO videos (filename, type) VALUES (?, ?)", [
      aiFilename,
      "ai",
    ]);

    res.json({ message: "AI video created", filename: aiFilename });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI video creation failed" });
  }
});

export default router;
