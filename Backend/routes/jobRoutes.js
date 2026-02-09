import express from 'express';
import { startJobs } from '../controllers/jobController.js';
export const jobRouter = express.Router();

jobRouter.post('/start', startJobs);
