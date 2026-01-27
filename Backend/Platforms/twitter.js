export async function publishTwitter(post) {
  console.log("🐦 Publishing to X...");
  return {
    platform: "twitter",
    postId: "tw_" + Date.now(),
    status: "published"
  };
}

export async function fetchTwitterMetrics(postId) {
  return {
    likes: Math.floor(Math.random() * 800),
    reposts: Math.floor(Math.random() * 200),
    replies: Math.floor(Math.random() * 120),
    impressions: Math.floor(Math.random() * 15000)
  };
}
