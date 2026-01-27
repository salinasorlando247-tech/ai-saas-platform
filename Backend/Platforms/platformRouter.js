import { publishInstagram, fetchInstagramMetrics } from "./instagram.js";
import { publishTikTok, fetchTikTokMetrics } from "./tiktok.js";
import { publishYouTube, fetchYouTubeMetrics } from "./youtube.js";
import { publishTwitter, fetchTwitterMetrics } from "./twitter.js";
import { publishLinkedIn, fetchLinkedInMetrics } from "./linkedin.js";

export async function publishPost(platform, post) {
  switch (platform) {
    case "instagram": return publishInstagram(post);
    case "tiktok": return publishTikTok(post);
    case "youtube": return publishYouTube(post);
    case "twitter": return publishTwitter(post);
    case "linkedin": return publishLinkedIn(post);
    default:
      throw new Error("Unsupported platform: " + platform);
  }
}

export async function fetchMetrics(platform, postId) {
  switch (platform) {
    case "instagram": return fetchInstagramMetrics(postId);
    case "tiktok": return fetchTikTokMetrics(postId);
    case "youtube": return fetchYouTubeMetrics(postId);
    case "twitter": return fetchTwitterMetrics(postId);
    case "linkedin": return fetchLinkedInMetrics(postId);
    default:
      throw new Error("Unsupported platform: " + platform);
  }
}
