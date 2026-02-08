import { Scheduler } from "../services/Scheduler.js";

export const scheduleVideo = async (req, res) => {
  const { videoId, dateTime } = req.body;
  await Scheduler.schedule(videoId, dateTime);
  res.json({ message: "Video scheduled" });
};

export const bulkSchedule = async (req, res) => {
  const { videos } = req.body; // array of { videoId, dateTime }
  await Scheduler.bulkSchedule(videos);
  res.json({ message: "Bulk schedule completed" });
};
