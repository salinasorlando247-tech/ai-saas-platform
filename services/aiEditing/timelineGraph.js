export function buildTimelineGraph(analysis) {
  const timeline = [];

  for (let t = 0; t < analysis.duration; t += 0.5) {
    timeline.push({
      time: t,
      action: null,
      confidence: 0,
    });
  }

  analysis.speechSegments.forEach(seg => {
    timeline.forEach(node => {
      if (node.time >= seg.start && node.time <= seg.end) {
        node.action = 'highlight';
        node.confidence += 0.7;
      }
    });
  });

  return timeline;
}
