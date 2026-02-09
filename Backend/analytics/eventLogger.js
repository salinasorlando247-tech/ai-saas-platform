import { logAnalytics, calculateVirality } from './analyticsHelper.js';

export const logVideoEvent = async (videoData) => {
    // Calculate virality
    const viralityScore = calculateVirality(videoData);

    // Log core video event
    await logAnalytics('video_event', { ...videoData, viralityScore });

    // Track individual clips
    for(const clip of videoData.clips) {
        await logAnalytics('clip_event', { clipId: clip.id, duration: clip.duration });
    }

    // Optionally run full 150+ analytics
    await logAnalytics('full_analytics_run', { videoId: videoData.id, clipsCount: videoData.clips.length });

    return viralityScore;
};
