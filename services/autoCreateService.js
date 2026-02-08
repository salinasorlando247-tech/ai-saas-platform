import { aiEditingEngine } from './aiEditingEngine.js';
import { socialPostService } from './socialPostService.js';
import { clipService } from './clipService.js';
import { getUserPlatforms, saveScheduledVideo } from './dbService.js';

/**
 * Auto-create videos for all connected platforms
 * @param {Object} user - User object with tier, industry, and connected platforms
 */
export const autoCreateDailyVideos = async (user) => {
  try {
    const { id: userId, tier, industry } = user;

    // 1️⃣ Generate main video using AI
    const mainVideoFile = await aiEditingEngine.autoCreateVideo({
      userId,
      industry,
      tier
    });

    // 2️⃣ Generate clips from main video (all tiers)
    const clips = await clipService.generateClips({
      videoFile: mainVideoFile,
      userId,
      tier,
      numberOfClips: tier === 'Free' ? 10 : 50, // example limits
      industry
    });

    // 3️⃣ Get user connected platforms
    const platforms = await getUserPlatforms(userId); // returns array of platform names

    // 4️⃣ Post each video at optimal time
    const scheduledPosts = [];
    for (let platform of platforms) {
      // Calculate best time based on analytics
      const bestTime = await aiEditingEngine.predictBestTime({ userId, platform });

      // Save scheduled post in DB
      const scheduledVideo = await saveScheduledVideo({
        userId,
        platform,
        videoFile: mainVideoFile,
        scheduleTime: bestTime
      });

      scheduledPosts.push(scheduledVideo);
    }

    return { mainVideoFile, clips, scheduledPosts };
  } catch (err) {
    console.error('Error in auto-create daily videos:', err);
    throw err;
  }
};
