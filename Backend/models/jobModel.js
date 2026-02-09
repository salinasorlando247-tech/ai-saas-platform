import { pool } from '../config/db.js';

export const insertJob = async (type, status) => {
    const query = `
        INSERT INTO jobs(type, status)
        VALUES($1, $2) RETURNING *;
    `;
    const values = [type, status];
    const result = await pool.query(query, values);
    return result.rows[0];
};
