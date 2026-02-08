import API from "./api";

export const fetchAnalytics = async () => {
  const res = await API.get("/analytics");
  return res.data;
};
