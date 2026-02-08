import pool from "../db.js";

export const addVideo = async (filename, client_id, status="uploaded") => {
  const [result] = await pool.query(
    "INSERT INTO videos (filename, client_id, status) VALUES (?, ?, ?)",
    [filename, client_id, status]
  );
  return result.insertId;
};

export const getVideoById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM videos WHERE id = ?", [id]);
  return rows[0];
};

export const getAllVideos = async () => {
  const [rows] = await pool.query("SELECT * FROM videos");
  return rows;
};
