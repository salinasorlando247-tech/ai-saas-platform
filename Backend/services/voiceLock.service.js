const lockedVoices = new Map();

export function lockVoice(clientId, voiceProfile) {
  lockedVoices.set(clientId, voiceProfile);
}

export function getLockedVoice(clientId) {
  return lockedVoices.get(clientId);
}
