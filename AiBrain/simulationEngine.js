export const simulateOutcome = (action) => {

  return {
    predictedViews: Math.floor(Math.random() * 100000),
    predictedLikes: Math.floor(Math.random() * 10000),
    predictedRisk: Math.random() * 10
  };
};
