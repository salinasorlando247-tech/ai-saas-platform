const renders = {}; // replace with DB for production

export function startRender(userId, videoData) {
  const renderId = `render_${Date.now()}_${userId}`;
  renders[renderId] = { 
    progress: 0, 
    speed: 2.0, // optimized speed
    quality: "Ultra", 
    voiceType: videoData.voiceType || "human",
    avatarType: videoData.avatar || "ultra",
    userId 
  };

  // Simulate render
  const interval = setInterval(() => {
    if (renders[renderId].progress >= 100) {
      clearInterval(interval);
    } else {
      renders[renderId].progress += Math.random() * 5 + 3; // fast increments
    }
  }, 500);

  return renderId;
}

export function getRenderProgress(renderId) {
  if (!renders[renderId]) return { progress: 0, speed: 0, quality: "Unknown", voiceType: "Unknown" };
  return renders[renderId];
}
