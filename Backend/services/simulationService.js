import User from "./user.js";
import FacelessUsage from "./facelessUsage.js";
import { renderFacelessVideo } from "./videoAI.js";
import { getTopPlayerData } from "./analyticsService.js";

// Simulation engine
export async function runVideoSimulation(userId, script, options) {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const { videoLength, platform } = options;

  // Daily quota check
  const today = new Date().toDateString();
  const usageToday = await FacelessUsage.find({ user: userId, date: { $gte: new Date(today), $lt: new Date(today + " 23:59:59") } });
  const shortUsed = usageToday.filter(v => v.length <= 2).length;
  const longUsed = usageToday.filter(v => v.length > 2).length;

  if (videoLength <= 2 && shortUsed >= 3) throw new Error("Daily short video quota reached (3 max)");
  if (videoLength === 5 && longUsed >= 1) throw new Error("Daily long video quota reached (1 max)");

  // Fetch top player data
  const topData = await getTopPlayerData(user.industry, platform);

  // Run multivariate simulation (simplified example)
  const variations = generateVideoVariations(script, user, topData, videoLength);

  // Predict metrics for each variation
  const simulationResults = variations.map(variation => {
    const successProbability = predictSuccess(variation, topData);
    const emotionScore = predictEmotionImpact(variation);

    return {
      ...variation,
      predictedViews: Math.round(successProbability * 10000),
      predictedLikes: Math.round(successProbability * 1000),
      predictedShares: Math.round(successProbability * 500),
      predictedWatchTime: Math.round(successProbability * 300), // seconds
      successProbability: Math.round(successProbability * 100),
      emotionScore,
    };
  });

  // Find the top-performing variation
  const bestVariation = simulationResults.reduce((prev, curr) => (curr.successProbability > prev.successProbability ? curr : prev), simulationResults[0]);

  // Save usage
  await FacelessUsage.create({
    user: userId,
    length: videoLength,
    simulationOnly: true,
    date: new Date(),
  });

  return { simulationResults, bestVariation };
}

// Generate video variations (script, avatar, voice, thumbnail, etc.)
function generateVideoVariations(script, user, topData, videoLength) {
  const voices = user.facelessUnlocked ? ["human", "animated", "robot", "neuralUltra"] : ["human", "robot"];
  const avatars = user.facelessUnlocked ? ["ultraRealistic", "animated", "cartoon"] : ["animated"];
  const thumbnails = ["standard", "eye-catching", "motion"];
  const variations = [];

  voices.forEach(voice => {
    avatars.forEach(avatar => {
      thumbnails.forEach(thumbnail => {
        variations.push({ script, voice, avatar, thumbnail, videoLength });
      });
    });
  });

  return variations;
}

// Predict success probability (0-1) based on variation + top players + trends
function predictSuccess(variation, topData) {
  let base = 0.5; // default 50%
  // boost if avatar/voice style matches top trends
  if (topData.trendingAvatars.includes(variation.avatar)) base += 0.2;
  if (topData.trendingVoices.includes(variation.voice)) base += 0.2;
  // limit to max 0.99
  return Math.min(base, 0.99);
}

// Predict emotion impact (0-1)
function predictEmotionImpact(variation) {
  let score = 0.5;
  if (variation.voice === "neuralUltra") score += 0.2;
  if (variation.avatar === "ultraRealistic") score += 0.2;
  return Math.min(score, 0.99);
}

// Auto-generate the top video
export async function autoCreateBestVideo(userId, bestVariation) {
  const videoUrl = await renderFacelessVideo(bestVariation.script, bestVariation);
  return videoUrl;
}
