import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import videoRoutes from './routes/videoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import { startScheduler } from './jobs/scheduler.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// API routes
app.use('/api/videos', videoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);

// Start scheduler (auto-post, job queue)
startScheduler();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`ForgeAI Backend running on port ${PORT}`));
