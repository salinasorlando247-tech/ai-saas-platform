import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import aiVideoRoutes from './routes/aiVideo.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import morgan from 'morgan';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/aiVideo', aiVideoRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('ForgeAI Backend is running 🚀');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Optional: set up a daily scheduler for auto-create videos
import cron from 'node-cron';
import { aiVideoService } from './services/aiVideoService.js';

cron.schedule('0 0 * * *', async () => {
  console.log('Running daily auto-create job...');
  try {
    const users = await aiVideoService.getAllUsersWithAutoCreate(); // returns all users who enabled auto-create
    for (const user of users) {
      await aiVideoService.createAndPostVideo(user.id);
      console.log(`Auto-created video for user ${user.id}`);
    }
  } catch (err) {
    console.error('Error in daily auto-create job:', err);
  }
});
