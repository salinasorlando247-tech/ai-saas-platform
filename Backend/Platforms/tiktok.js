export async function publishTikTok(post) {
  console.log("🎵 Publishing to TikTok...");
  return {
    platform: "tiktok",
    postId: "tt_" + Date.now(),
    status: "published"
  };
}

export async function fetchTikTokMetrics(postId) {
  return {
    likes: Math.floor(Math.random() * 2000),
    comments: Math.floor(Math.random() * 150),
    shares: Math.floor(Math.random() * 300),
    views: Math.floor(Math.random() * 20000),
    watchTime: Math.floor(Math.random() * 60000)
  };
}
