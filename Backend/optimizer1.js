import Analytics from "./analytics.js";

export default class Optimizer {
  constructor() {
    this.analytics = new Analytics();
  }

  analyzeAndOptimize(clientName, posts) {
    const metrics = this.analytics.getMetrics(clientName);
    const optimizedPosts = posts.map((p) => {
      const postMetrics = metrics[p.id] || { likes: 0 };
      if (postMetrics.likes < 5) {
        p.content += " 🔥 Improved based on analytics";
      }
      return p;
    });

    return optimizedPosts;
  }
}
