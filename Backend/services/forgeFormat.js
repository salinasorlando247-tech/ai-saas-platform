export const createForgeVideoObject = ({
  videoId,
  userId,
  industry,
  platforms,
  hookType,
  duration,
  timeline,
  engagementScore
}) => {
  return {
    forgeVideoId: videoId,
    owner: userId,
    industry,
    platforms,
    hookType,
    duration,
    timeline, // AI-generated edit timeline
    engagementScore,
    createdAt: Date.now(),
    version: '1.0.0'
  }
}
