import fs from "fs";
import axios from "axios";
import { exec } from "child_process";
import path from "path";

export async function generateVideoFramesFromTextGPU(originalVideoPath, instructions, startTime) {
  const overlayPath = originalVideoPath.replace(".mp4", `_aiOverlay.mp4`);
  const tempClipPath = originalVideoPath.replace(".mp4", `_clip_${Date.now()}.mp4`);

  // Clip the original video (GPU-accelerated encoding)
  await new Promise((resolve, reject) => {
    const cmd = `ffmpeg -hwaccel cuda -ss ${startTime} -i "${originalVideoPath}" -t 3 -c:v h264_nvenc "${tempClipPath}"`;
    exec(cmd, (err) => (err ? reject(err) : resolve()));
  });

  const runwayAPIKey = process.env.RUNWAY_API_KEY || "YOUR_API_KEY";
  const apiURL = "https://api.runwayml.com/v1/video-generation";

  try {
    const response = await axios.post(
      apiURL,
      { prompt: instructions, source_video_path: tempClipPath, output_format: "mp4", resolution: "1080p" },
      { headers: { Authorization: `Bearer ${runwayAPIKey}`, "Content-Type": "application/json" }, responseType: "arraybuffer" }
    );

    fs.writeFileSync(overlayPath, Buffer.from(response.data));
    fs.unlinkSync(tempClipPath);
    return overlayPath;
  } catch (err) {
    console.error("AI GPU overlay failed, using placeholder clip:", err);
    return tempClipPath;
  }
}
