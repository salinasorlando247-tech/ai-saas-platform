// File: src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretforgeai';

// Middleware to verify JWT token
export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach user info to request
        req.user = decoded;

        // Optional: fetch full user from DB
        const result = await pool.query('SELECT id, username, role, email FROM users WHERE id=$1', [decoded.id]);
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'User not found' });
        }

        req.user = result.rows[0];
        next();
    } catch (err) {
        console.error('AuthMiddleware error:', err.message);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Middleware to check for admin role (for marketplace / monetization access)
export const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied, admin only' });
    }
    next();
};
