// src/services/facelessService.js

import { v4 as uuidv4 } from "uuid";
import { generateScript } from "./scriptService.js";
import { synthesizeVoice } from "./voiceService.js";
import { generateScenes } from "./sceneService.js";
import { optimizeAudio } from "./audioService.js";
import { simulatePerformance } from "./simulationService.js";
import { renderVideo } from "./renderService.js";
import { saveVideoMetadata } from "./videoRepository.js";
import { handleSuccessfulFacelessUsage } from "./usageMeterService.js";

/**
 * FACeless AI VIDEO ENGINE
 * Outcome-first. Abuse-safe. Business-grade.
 */

export async function createFacelessVideo({
  user,
  prompt,
  platform,
  durationSeconds,
  voiceProfile,
  stylePreset,
}) {
  // ---- ACCESS CONTROL -------------------------------
  if (!user.facelessEnabled) {
    throw new Error("Faceless video access not enabled.");
  }

  if (durationSeconds > 300) {
    throw new Error("Faceless videos are capped at 5 minutes.");
  }

  const videoId = uuidv4();

  // ---- SCRIPT ---------------------------------------
  const script = await generateScript({
    prompt,
    platform,
    durationSeconds,
    format: "faceless",
    tone: stylePreset?.tone || "engaging",
  });

  // ---- VOICE ----------------------------------------
  const voiceTrack = await synthesizeVoice({
    script,
    voiceProfile,
    realism: "ultra",
    pacing: platform === "tiktok" ? "fast" : "balanced",
  });

  // ---- VISUALS --------------------------------------
  const scenes = await generateScenes({
    script,
    platform,
    stylePreset,
    pacingModel: "retention-first",
  });

  // ---- AUDIO OPTIMIZATION ----------------------------
  const optimizedAudio = await optimizeAudio({
    voiceTrack,
    platform,
    detectEnvironment: true, // wind, traffic, hum
    normalize: true,
    clarityBoost: true,
  });

  // ---- SIMULATION -----------------------------------
  const simulation = await simulatePerformance({
    script,
    scenes,
    audioProfile: optimizedAudio.profile,
    platform,
    durationSeconds,
  });

  // Kill losers early
  if (simulation.confidenceScore < 0.55) {
    return {
      status: "rejected",
      reason: "Predicted underperformance",
      simulation,
    };
  }

  // ---- RENDER ---------------------------------------
  const rendered = await renderVideo({
    videoId,
    scenes,
    audio: optimizedAudio.file,
    captions: true,
    thumbnail: true,
    resolution: platform === "youtube" ? "1080p" : "720p",
  });

  // ---- SAVE -----------------------------------------
  await saveVideoMetadata({
    videoId,
    userId: user.id,
    faceless: true,
    platform,
    durationSeconds,
    simulation,
  });

  // ---- USAGE + REFERRALS (POST-SUCCESS ONLY) --------
  await handleSuccessfulFacelessUsage({
    user,
    videoId,
    durationSeconds,
  });

  // ---- RESPONSE -------------------------------------
  return {
    status: "success",
    videoId,
    previewUrl: rendered.previewUrl,
    confidence: simulation.confidenceScore,
    simulation,
  };
}
