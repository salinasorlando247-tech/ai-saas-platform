import fs from "fs";
import path from "path";

const engagementPath = path.resolve("backend/engagement.json");
if (!fs.existsSync(engagementPath)) fs.writeFileSync(engagementPath, JSON.stringify({}));

export function logEngagement(postId, metrics) {
  const data = JSON.parse(fs.readFileSync(engagementPath));
  if (!data[postId]) data[postId] = [];
  data[postId].push({ ...metrics, timestamp: Date.now() });
  fs.writeFileSync(engagementPath, JSON.stringify(data, null, 2));
}

export function getEngagement(postId) {
  const data = JSON.parse(fs.readFileSync(engagementPath));
  return data[postId] || [];
}

export function getAllEngagement() {
  return JSON.parse(fs.readFileSync(engagementPath));
}
