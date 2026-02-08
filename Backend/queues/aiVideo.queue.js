import { optimizeAvatarForVideo } from '../ai/avatarOptimizer.js';
import { createVideo } from '../services/videoService.js';
import { postToAllPlatforms } from '../services/multiPlatformService.js';
import { sendNotification } from '../services/notificationService.js';

export const aiVideoWorker = async (job) => {
  const { script, user, settings } = job.data;

  // Optional avatar
  let avatarData = null;
  if (settings.useAvatar) {
    avatarData = await optimizeAvatarForVideo({ text: script, user, avatar: user.avatar });
  }

  // Generate the video
  const video = await createVideo({ script, avatarData, user });

  // Post to all connected platforms automatically
  await postToAllPlatforms({ video, user });

  // Notify user
  await sendNotification({ user, message: 'Your video was auto-created and posted!' });

  return video;
};
