import express from 'express';
import { getTemplates, addTemplate } from '../controllers/templateController.js';
export const templateRouter = express.Router();

templateRouter.get('/', getTemplates);
templateRouter.post('/add', addTemplate);
