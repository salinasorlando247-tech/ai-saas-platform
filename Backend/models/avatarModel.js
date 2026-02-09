import { pool } from '../config/db.js';

export const insertAvatar = async (videoId, avatarUrl) => {
    const query = `
        INSERT INTO avatars(video_id, avatar_url)
        VALUES($1, $2) RETURNING *;
    `;
    const values = [videoId, avatarUrl];
    const result = await pool.query(query, values);
    return result.rows[0];
};
