import { pool } from '../config/db.js';

// Get user settings
export const getUserSettings = async (userId) => {
    const res = await pool.query(`SELECT * FROM user_settings WHERE user_id=$1`, [userId]);
    return res.rows[0];
};

// Update user settings
export const updateUserSettings = async (userId, settings) => {
    const res = await pool.query(`
        UPDATE user_settings
        SET auto_post=$1, preferred_platforms=$2, notifications=$3
        WHERE user_id=$4 RETURNING *;
    `, [settings.auto_post, JSON.stringify(settings.preferred_platforms), settings.notifications, userId]);
    return res.rows[0];
};
