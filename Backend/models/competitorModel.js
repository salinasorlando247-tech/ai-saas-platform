import pool from "../db.js";

export const addCompetitor = async (name, hashtags=[], posting_time="00:00", top_elements=[]) => {
  const [result] = await pool.query(
    "INSERT INTO competitors (name, hashtags, posting_time, top_elements) VALUES (?, ?, ?, ?)",
    [name, JSON.stringify(hashtags), posting_time, JSON.stringify(top_elements)]
  );
  return result.insertId;
};

export const getAllCompetitors = async () => {
  const [rows] = await pool.query("SELECT * FROM competitors");
  return rows;
};
