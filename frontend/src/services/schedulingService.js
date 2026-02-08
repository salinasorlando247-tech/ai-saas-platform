import API from "./api";

export const fetchSchedule = async () => {
  const res = await API.get("/schedule");
  return res.data;
};

export const createSchedule = async (videoId, date) => {
  const res = await API.post("/schedule", { videoId, date });
  return res.data;
};
