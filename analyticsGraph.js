import Analytics from "./analytics.js";

export default class AnalyticsGraph {
  constructor() {
    this.analytics = new Analytics();
  }

  generateGraphData(clientName) {
    const metrics = this.analytics.getMetrics(clientName);
    const graphData = {
      likes: [],
      shares: [],
      comments: [],
      followers: [],
    };

    for (const postId in metrics) {
      const m = metrics[postId];
      graphData.likes.push(m.likes);
      graphData.shares.push(m.shares);
      graphData.comments.push(m.comments);
      graphData.followers.push(m.followers);
    }

    return graphData;
  }
}
