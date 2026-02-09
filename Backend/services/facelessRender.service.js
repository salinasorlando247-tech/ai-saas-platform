const renders = {}; // in-memory, replace with DB for production

export function startRender(userId, videoLength) {
  const renderId = `render_${Date.now()}_${userId}`;
  renders[renderId] = { progress: 0, speed: 1.5, quality: "Ultra", userId };

  // simulate render progress server-side
  const interval = setInterval(() => {
    if (renders[renderId].progress >= 100) {
      clearInterval(interval);
    } else {
      renders[renderId].progress += Math.random() * 5 + 2; // random increments 2-7%
    }
  }, 500);

  return renderId;
}

export function getRenderProgress(renderId) {
  if (!renders[renderId]) return { progress: 0, speed: 0, quality: "Unknown" };
  return renders[renderId];
}
