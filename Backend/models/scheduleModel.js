import pool from "../db.js";

export const scheduleVideo = async (video_id, scheduled_date, platform="all") => {
  const [result] = await pool.query(
    "INSERT INTO schedules (video_id, scheduled_date, platform) VALUES (?, ?, ?)",
    [video_id, scheduled_date, platform]
  );
  return result.insertId;
};

export const getScheduledVideos = async () => {
  const [rows] = await pool.query("SELECT * FROM schedules WHERE posted = FALSE");
  return rows;
};
