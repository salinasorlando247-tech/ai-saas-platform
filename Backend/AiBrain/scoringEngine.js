export const scoreAction = (action) => {

  return {
    engagement: Math.random() * 100,
    risk: Math.random() * 30,
    growth: Math.random() * 50
  };
};
