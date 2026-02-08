import fs from "fs";
import path from "path";

const analyticsFile = path.join("uploads", "analytics.json");

export function recordVideoAnalytics(videoID, metrics) {
  let analytics = [];
  if (fs.existsSync(analyticsFile)) analytics = JSON.parse(fs.readFileSync(analyticsFile));
  analytics.push({ videoID, metrics, timestamp: Date.now() });
  fs.writeFileSync(analyticsFile, JSON.stringify(analytics, null, 2));
}

export function suggestVideoOptimization(videoID) {
  if (!fs.existsSync(analyticsFile)) return null;
  const analytics = JSON.parse(fs.readFileSync(analyticsFile));
  const videoData = analytics.filter(a => a.videoID === videoID);
  if (!videoData.length) return null;

  const lastMetrics = videoData[videoData.length - 1].metrics;
  if (lastMetrics.views < 1000) {
    return {
      editType: "add_dynamic_text_overlay",
      hashtags: ["#Trending", "#AIContent", "#ViralVideo"],
      cta: "Watch and Share!",
      postingTime: "Evening",
    };
  }
  return { editType: "keep_style", hashtags: lastMetrics.hashtags || [], cta: lastMetrics.cta || "Check this out!", postingTime: "Same as before" };
}
