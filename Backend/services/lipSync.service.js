export function generateLipSync({ audioUrl, avatarId }) {
  return {
    avatarId,
    audioUrl,
    lipSyncData: `/lipsync/${avatarId}_${Date.now()}.json`,
    quality: "ultra-realistic"
  };
}
