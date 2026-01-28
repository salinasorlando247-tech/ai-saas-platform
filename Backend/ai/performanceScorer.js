export function scorePost(post) {
  const likes = post.likes || 0
  const shares = post.shares || 0
  const comments = post.comments || 0
  const clicks = post.clicks || 0

  const score =
    likes * 1.0 +
    shares * 2.5 +
    comments * 3.0 +
    clicks * 4.0

  return Math.round(score)
}
