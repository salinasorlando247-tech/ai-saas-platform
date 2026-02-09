import express from 'express';
import { generateAvatarController } from '../controllers/avatarController.js';
export const avatarRouter = express.Router();

avatarRouter.post('/generate', generateAvatarController);
