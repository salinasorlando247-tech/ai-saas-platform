import fs from "fs";
import path from "path";

const analyticsFile = path.resolve("./analytics.json");

export function getAnalytics() {
  try {
    const data = fs.readFileSync(analyticsFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return { likes: 0, shares: 0, comments: 0 };
  }
}

export function trackEngagement(post, metrics) {
  const analytics = getAnalytics();
  analytics.likes += metrics.likes || 0;
  analytics.shares += metrics.shares || 0;
  analytics.comments += metrics.comments || 0;
  fs.writeFileSync(analyticsFile, JSON.stringify(analytics, null, 2));
}
