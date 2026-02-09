import { pool } from '../config/db.js';

export const insertPostJob = async (platform, status) => {
    const query = `
        INSERT INTO post_jobs(platform, status)
        VALUES($1, $2) RETURNING *;
    `;
    const values = [platform, status];
    const result = await pool.query(query, values);
    return result.rows[0];
};
