import { v4 as uuidv4 } from 'uuid';
import redis from '../config/redis.js';
import pool from '../config/db.js';

/**
 * Create a new video job
 */
export const createVideo = async (data) => {
  const videoId = uuidv4();

  // Save job in Redis
  await redis.set(`videoJob:${videoId}`, JSON.stringify({ status: 'pending', data }));

  // Save metadata in MySQL
  const sql = 'INSERT INTO videos(id, status, data) VALUES (?, ?, ?)';
  await pool.execute(sql, [videoId, 'pending', JSON.stringify(data)]);

  return { videoId, status: 'pending' };
};

/**
 * Edit an existing video
 */
export const editVideo = async ({ videoId, edits }) => {
  const jobStr = await redis.get(`videoJob:${videoId}`);
  const job = jobStr ? JSON.parse(jobStr) : {};

  const updatedJob = { ...job, edits, status: 'edited' };
  await redis.set(`videoJob:${videoId}`, JSON.stringify(updatedJob));

  // Update MySQL
  const sql = 'UPDATE videos SET status=?, data=? WHERE id=?';
  await pool.execute(sql, ['edited', JSON.stringify(updatedJob.data), videoId]);

  return updatedJob;
};

/**
 * Get status of a video job
 */
export const getVideoStatus = async (videoId) => {
  const jobStr = await redis.get(`videoJob:${videoId}`);
  if (jobStr) return JSON.parse(jobStr);

  // Fallback to MySQL
  const sql = 'SELECT * FROM videos WHERE id=?';
  const [rows] = await pool.execute(sql, [videoId]);
  return rows[0] || null;
};
