import { publishPost } from "./contentManager.js";

export function schedulePosts() {
  console.log("⏱️ Scheduler running (every minute)");
  setInterval(() => {
    // Here you could fetch queued posts from DB or JSON
    console.log("Scheduler tick: checking for posts to publish...");
  }, 60 * 1000);
}
