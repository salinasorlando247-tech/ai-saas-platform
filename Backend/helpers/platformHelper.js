/**
 * Mock function to post video to multiple platforms
 */
export const postToPlatforms = async (video, platforms) => {
  return platforms.map(platform => ({
    platform,
    status: 'posted',
    videoId: video.videoId
  }));
};
