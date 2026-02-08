import TikTokAPI from './tiktokService.js';
import YouTubeAPI from './youtubeService.js';
import InstagramAPI from './instagramService.js';
// ... import other 17 platform APIs

export async function postToAllPlatforms({ video, user }) {
  const platforms = user.connectedPlatforms; // Array of 20+ platforms
  const postPromises = platforms.map(async (platform) => {
    switch(platform) {
      case 'tiktok': return TikTokAPI.upload(video, user);
      case 'youtube': return YouTubeAPI.upload(video, user);
      case 'instagram': return InstagramAPI.upload(video, user);
      // ... other 17 platforms
      default: return null;
    }
  });
  await Promise.all(postPromises);
}
