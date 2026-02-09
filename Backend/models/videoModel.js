import { pool } from '../config/db.js';

export const insertVideo = async (video) => {
    const query = `
        INSERT INTO videos(title, template, clips, avatar, captions, vr_overlay, created_at)
        VALUES($1,$2,$3,$4,$5,$6,NOW()) RETURNING *;
    `;
    const values = [
        video.title,
        video.template,
        JSON.stringify(video.clips),
        video.avatar,
        JSON.stringify(video.captions),
        video.vrOverlay
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
};
