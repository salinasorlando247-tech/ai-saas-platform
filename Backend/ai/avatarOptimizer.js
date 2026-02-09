import { analyzeTextEmotion } from './aiTextAnalysis.js';
import { generateAvatarVoice } from './avatarVoiceService.js';

export async function optimizeAvatarForVideo({ text, user, avatar }) {
  const emotion = analyzeTextEmotion(text); // AI predicts emotion
  const voiceBuffer = await generateAvatarVoice({ text, user, voiceId: avatar.voiceId });

  return { voiceBuffer, emotion };
}
