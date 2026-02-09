import { pool } from '../config/db.js';

export const insertUser = async (username, email) => {
    const query = `
        INSERT INTO users(username,email)
        VALUES($1,$2) RETURNING *;
    `;
    const values = [username,email];
    const result = await pool.query(query, values);
    return result.rows[0];
};
