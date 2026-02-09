import express from 'express';
import { getPlatforms } from '../controllers/postController.js';
export const platformRouter = express.Router();

platformRouter.get('/', getPlatforms);
