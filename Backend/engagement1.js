import fs from "fs";
import path from "path";

const filePath = path.resolve("./backend/engagement.json");

function ensureFile() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ posts: {} }, null, 2));
  }
}

export function logEngagement(postId, metrics) {
  ensureFile();
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!data.posts[postId]) data.posts[postId] = [];
  data.posts[postId].push({ timestamp: Date.now(), ...metrics });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function getEngagement(postId) {
  ensureFile();
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return data.posts[postId] || [];
}

export function getAllEngagement() {
  ensureFile();
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return data.posts;
}
