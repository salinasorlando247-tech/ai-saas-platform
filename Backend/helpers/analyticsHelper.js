import pool from '../config/db.js';

/**
 * Get all analytics metrics
 */
export const getAnalytics = async () => {
  const sql = 'SELECT * FROM analytics';
  const [rows] = await pool.execute(sql);
  return rows.map(row => ({
    id: row.id,
    name: row.name,
    value: row.value
  }));
};

/**
 * Log a new analytic event
 */
export const logEvent = async ({ name, value }) => {
  const sql = 'INSERT INTO analytics(name, value) VALUES (?, ?)';
  await pool.execute(sql, [name, value]);
};
