import express from "express";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";

const router = express.Router();

router.post("/edit", async (req, res) => {
  try {
    const { videoPath, instructions } = req.body;
    if (!fs.existsSync(videoPath)) return res.status(400).json({ error: "Video not found" });

    const formData = new FormData();
    formData.append("model", "gpt-video-editor");
    formData.append("file", fs.createReadStream(videoPath));
    formData.append("instructions", instructions);

    const response = await axios.post(
      "https://api.openai.com/v1/video/edits",
      formData,
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, ...formData.getHeaders() }, responseType: "arraybuffer" }
    );

    const outputPath = videoPath.replace(".mp4", "-edited.mp4");
    fs.writeFileSync(outputPath, response.data);
    res.json({ status: "Success", editedVideo: outputPath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI editing failed", details: err.message });
  }
});

export default router;
