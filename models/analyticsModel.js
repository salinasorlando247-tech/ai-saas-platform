import pool from "../db.js";

export const recordAnalytics = async (video_id, data) => {
  const { views, likes, shares, comments, subscribers_gained, cta_clicks } = data;
  const [result] = await pool.query(
    `INSERT INTO analytics (video_id, views, likes, shares, comments, subscribers_gained, cta_clicks)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [video_id, views || 0, likes || 0, shares || 0, comments || 0, subscribers_gained || 0, cta_clicks || 0]
  );
  return result.insertId;
};

export const getAnalyticsByVideo = async (video_id) => {
  const [rows] = await pool.query("SELECT * FROM analytics WHERE video_id = ?", [video_id]);
  return rows;
};
