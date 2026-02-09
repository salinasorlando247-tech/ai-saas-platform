import { pool } from '../config/db.js';

export const insertAnalytics = async (event, data) => {
    const query = `
        INSERT INTO analytics(event, data)
        VALUES($1, $2) RETURNING *;
    `;
    const values = [event, JSON.stringify(data)];
    const result = await pool.query(query, values);
    return result.rows[0];
};
