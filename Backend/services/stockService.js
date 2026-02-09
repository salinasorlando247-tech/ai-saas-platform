export async function getStockClips(scenes) {
  return scenes.map(scene => ({
    sceneId: scene.id,
    type: "video",
    category: scene.topic,
    duration: scene.duration,
    source: "licensed"
  }));
}
