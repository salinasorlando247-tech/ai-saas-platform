export function decideEdits(timeline, platform) {
  return timeline
    .filter(node => node.confidence > 0.6)
    .map(node => {
      return {
        time: node.time,
        edit: platform === 'tiktok'
          ? 'quick-zoom'
          : 'soft-highlight',
      };
    });
}
