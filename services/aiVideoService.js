import schema from "../schemas/forge.video.schema.json" assert { type: "json" };
import { enqueueRenderJob } from "./renderQueue.js";
import { analyzePreview } from "./previewFeedback.service.js";
import { generateInsights } from "./analyticsService.js";
import { recommendSchedule } from "./scheduler.service.js";
import { synthesizeVoice } from "./voiceSynthesis.service.js";
import { applyEmotion } from "./voiceEmotion.service.js";
import { generateVoiceVariants } from "./voiceAB.service.js";
import { evolveVoice } from "./voiceLearning.service.js";
import { generateLipSync } from "./lipSync.service.js";
import { getIndustryVoice } from "./voiceDefaults.service.js";
import { getLockedVoice } from "./voiceLock.service.js";

export async function generateVideo({
  user,
  faceless,
  duration,
  scenes,
  voiceConfig,
  industry,
  avatarId
}) {
  enforceRules(user, faceless, duration);

  const previewFrames = scenes.map(s => ({
    sceneId: s.id,
    lowResFrame: `/preview/${s.id}.jpg`
  }));

  const feedback = analyzePreview(previewFrames);
  const insights = generateInsights(feedback);
  const schedule = recommendSchedule(insights);

  const lockedVoice = getLockedVoice(user.clientId);
  let baseVoice = lockedVoice || voiceConfig || {
    personality: getIndustryVoice(industry)
  };

  baseVoice = evolveVoice(baseVoice, feedback);
  baseVoice = applyEmotion(baseVoice, baseVoice.emotionSliders || {});

  const voiceVariants = generateVoiceVariants(baseVoice);
  const voice = await synthesizeVoice(voiceVariants[0]);

  const lipSync = avatarId
    ? generateLipSync({ audioUrl: voice.audioUrl, avatarId })
    : null;

  const job = enqueueRenderJob({
    tier: user.tier,
    faceless,
    duration
  });

  return {
    status: "rendering",
    previewFrames,
    voice,
    lipSync,
    insights,
    recommendedSchedule: schedule,
    renderQueue: job
  };
}

function enforceRules(user, faceless, duration) {
  const tierRules = schema.tiers[user.tier];

  if (user.tier === "free") {
    if (!faceless) throw new Error("Free tier faceless only");
    if (duration > tierRules.longMaxSeconds)
      throw new Error("Free tier max duration exceeded");
  }

  if (user.tier === "starter" && faceless) {
    if (duration > tierRules.facelessMaxSeconds)
      throw new Error("Starter tier faceless limit exceeded");
  }
}
