export const analyticsData = {
  YouTube: [],
  TikTok: [],
  Instagram: [],
  LinkedIn: [],
  Snapchat: []
};

export function addAnalytics(platform, videoName, metrics) {
  if (!analyticsData[platform]) analyticsData[platform] = [];
  analyticsData[platform].push({ videoName, ...metrics });
}

export function getAnalytics(platform) {
  return platform ? analyticsData[platform] : analyticsData;
}
