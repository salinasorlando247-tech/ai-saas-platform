export async function generateSchedule({
  platform,
  contentType,
  industry,
  requestedTime
}) {
  // Simplified logic — expandable forever
  const platformBias = {
    tiktok: { peak: [18, 21] },
    youtube: { peak: [12, 15] },
    instagram: { peak: [11, 14] }
  };

  const peakHours = platformBias[platform]?.peak;

  if (!peakHours) return requestedTime;

  const optimizedHour =
    peakHours[Math.floor(Math.random() * peakHours.length)];

  const optimizedTime = new Date(requestedTime);
  optimizedTime.setHours(optimizedHour);

  return optimizedTime;
}
