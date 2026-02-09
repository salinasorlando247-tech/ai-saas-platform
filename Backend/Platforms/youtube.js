export async function publishYouTube(post) {
  console.log("▶️ Publishing to YouTube Shorts...");
  return {
    platform: "youtube",
    postId: "yt_" + Date.now(),
    status: "published"
  };
}

export async function fetchYouTubeMetrics(postId) {
  return {
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 200),
    views: Math.floor(Math.random() * 50000),
    watchTime: Math.floor(Math.random() * 120000)
  };
}
