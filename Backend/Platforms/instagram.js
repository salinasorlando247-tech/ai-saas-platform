export async function publishInstagram(post) {
  console.log("📸 Publishing to Instagram...");
  return {
    platform: "instagram",
    postId: "ig_" + Date.now(),
    status: "published"
  };
}

export async function fetchInstagramMetrics(postId) {
  return {
    likes: Math.floor(Math.random() * 500),
    comments: Math.floor(Math.random() * 80),
    shares: Math.floor(Math.random() * 40),
    saves: Math.floor(Math.random() * 60),
    views: Math.floor(Math.random() * 5000),
    watchTime: Math.floor(Math.random() * 20000)
  };
}
