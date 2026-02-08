import { generateVideoFromText, generateClipsFromVideo, autoDailyVideo } from '../utils/aiEngine.js';

export const aiService = {
  generateVideo: async ({ script, industry, userId }) => {
    // Call AI engine for full production video
    return await generateVideoFromText({ script, industry, userId });
  },

  generateClips: async ({ videoUrl, uploadFile, clipsCount, industry, userId }) => {
    // Generate 1–10 fully edited clips from a single video
    return await generateClipsFromVideo({ videoUrl, uploadFile, clipsCount, industry, userId });
  },

  autoCreateVideo: async ({ industry, userId }) => {
    // Auto-create daily videos using past performance analytics
    return await autoDailyVideo({ industry, userId });
  }
};
