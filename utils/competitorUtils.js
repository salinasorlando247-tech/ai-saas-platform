// Simulate competitor analysis

export const fetchCompetitorData = async () => {
  return [
    { name: "TopPlayer1", hashtags: ["#viral"], postingTime: "12:00" },
    { name: "TopPlayer2", hashtags: ["#trending"], postingTime: "18:00" }
  ];
};

export const analyzeCompetitors = async () => {
  return { strategy: "Use top-performing hashtags & effects" };
};
