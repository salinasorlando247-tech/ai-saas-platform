export function evolveVoice(voiceProfile, analytics) {
  if (analytics.retention < 70) {
    voiceProfile.pace = "faster";
    voiceProfile.intensity += 10;
  }

  if (analytics.comments > analytics.likes) {
    voiceProfile.warmth += 10;
  }

  return voiceProfile;
}
