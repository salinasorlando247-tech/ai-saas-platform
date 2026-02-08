export default {
  getTopPlayers: async (industry) => {
    // Simulate fetching top competitors
    return [`Competitor1_${industry}`, `Competitor2_${industry}`];
  },

  analyzeMetadata: async (competitors) => {
    return competitors.map(c => ({
      name: c,
      hashtags: ["#trend", "#viral"],
      ctas: ["Click now", "Learn more"],
      videoLength: 60,
    }));
  },
};
