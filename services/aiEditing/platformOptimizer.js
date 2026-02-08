export function optimizeForPlatform(platform) {
  if (platform === 'tiktok') {
    return {
      aspectRatio: '9:16',
      maxDuration: 60,
      pacing: 'fast',
    };
  }

  if (platform === 'youtube') {
    return {
      aspectRatio: '16:9',
      pacing: 'medium',
    };
  }

  return {};
}
