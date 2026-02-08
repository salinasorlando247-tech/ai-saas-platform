import fs from "fs";
import path from "path";
import { callVideoAI } from "../services/aiVideoService.js";
import { generateThumbnail } from "../services/thumbnailService.js";
import { scheduleAutoPost } from "../services/socialScheduler.js";
import { logAnalytics } from "../services/analyticsService.js";

export const generateFacelessVideo = async (req, res) => {
  try {
    const { script, avatar, voice, template, platform, tier } = req.body;

    // 1️⃣ Generate faceless video via AI
    const videoBuffer = await callVideoAI({
      type: "faceless",
      script,
      avatar,
      voice,
      template,
      platform,
      tier,
    });

    // 2️⃣ Save video
    const videoPath = path.join("uploads", `${Date.now()}_faceless.mp4`);
    fs.writeFileSync(videoPath, videoBuffer);

    // 3️⃣ Generate thumbnail
    const thumbnailBuffer = await generateThumbnail(videoBuffer, { type: "faceless" });
    const thumbnailPath = path.join("uploads", `${Date.now()}_thumbnail.png`);
    fs.writeFileSync(thumbnailPath, thumbnailBuffer);

    // 4️⃣ Schedule auto-post if user has it enabled (Starter+)
    if (tier !== "Free") {
      await scheduleAutoPost(videoPath, platform, tier);
    }

    // 5️⃣ Log analytics for all tiers
    await logAnalytics({ tier, platform, script, videoPath });

    res.status(200).json({
      success: true,
      videoUrl: `/uploads/${path.basename(videoPath)}`,
      thumbnailUrl: `/uploads/${path.basename(thumbnailPath)}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
