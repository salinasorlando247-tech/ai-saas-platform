import { logAnalytics } from './analyticsHelper.js';

export const trackEngagement = async (videoId, metrics) => {
    await logAnalytics('engagement', { videoId, metrics });
};
