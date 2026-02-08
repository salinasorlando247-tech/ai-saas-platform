import fs from "fs";
import path from "path";
import { trackEngagement } from "./analytics.js";

const postsFile = path.resolve("./posts.json");

export function publishPost(post) {
  console.log("=== POST PUBLISHED ===");
  console.log(post);

  // Save post
  let allPosts = [];
  if (fs.existsSync(postsFile)) {
    allPosts = JSON.parse(fs.readFileSync(postsFile, "utf-8"));
  }
  allPosts.push(post);
  fs.writeFileSync(postsFile, JSON.stringify(allPosts, null, 2));

  // Track simulated engagement
  trackEngagement(post, { likes: Math.floor(Math.random() * 10), shares: Math.floor(Math.random() * 5), comments: Math.floor(Math.random() * 3) });
}
