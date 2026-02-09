import { pool } from '../config/db.js';

export const insertTemplate = async (name, data) => {
    const query = `
        INSERT INTO templates(name, data)
        VALUES($1, $2) RETURNING *;
    `;
    const values = [name, JSON.stringify(data)];
    const result = await pool.query(query, values);
    return result.rows[0];
};

export const getAllTemplates = async () => {
    const result = await pool.query('SELECT * FROM templates');
    return result.rows;
};
