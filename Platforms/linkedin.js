export async function publishLinkedIn(post) {
  console.log("💼 Publishing to LinkedIn...");
  return {
    platform: "linkedin",
    postId: "li_" + Date.now(),
    status: "published"
  };
}

export async function fetchLinkedInMetrics(postId) {
  return {
    likes: Math.floor(Math.random() * 400),
    comments: Math.floor(Math.random() * 90),
    shares: Math.floor(Math.random() * 60),
    impressions: Math.floor(Math.random() * 10000)
  };
}
