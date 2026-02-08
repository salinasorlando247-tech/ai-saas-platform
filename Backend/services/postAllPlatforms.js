import { postVideoQueue } from "../queues/postVideo.queue.js";

export async function postEverywhere({
  videoUrl,
  caption,
  platforms,
  userTokens
}) {
  for (const platform of platforms) {
    await postVideoQueue.add("post-video", {
      platform,
      videoUrl,
      caption,
      userTokens
    });
  }
}
