import ElevenLabs from 'elevenlabs-sdk'; // hypothetical Node SDK
import { getUserTier } from '../middleware/auth.js';

const elevenLabsClient = new ElevenLabs({ apiKey: process.env.ELEVENLABS_API_KEY });

export async function generateAvatarVoice({ text, user, voiceId }) {
  // Use higher-quality voice for elite users
  const tier = getUserTier(user);
  const quality = tier === 'elite' ? 'premium' : 'standard';

  const audioBuffer = await elevenLabsClient.speech.synthesize({
    text,
    voice: voiceId || 'default',
    quality
  });

  return audioBuffer;
}
