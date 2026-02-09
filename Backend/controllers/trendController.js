import { fetchTrends } from "../services/trendService.js";

export const getTrends = async (req, res) => {
  const trends = await fetchTrends();
  res.json(trends);
};
