export function predictPerformance(post) {
  const engagement = (post.likes || 0) + (post.shares || 0) * 2 + (post.comments || 0) * 1.5;
  const score = Math.min(100, engagement * 1.2); 
  return Math.round(score * 100) / 100;
}
