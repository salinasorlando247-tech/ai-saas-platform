export const post = async ({ userId, videoId, captionBase, scheduleAt }) => {
  return {
    platform: 'tiktok',
    status: 'scheduled',
    scheduledAt: scheduleAt,
    optimization: {
      aspectRatio: '9:16',
      maxLength: 60,
      hookStrategy: 'first_2_seconds'
    }
  }
}
