import { insertTemplate, getAllTemplates } from '../models/templateModel.js';

export const getTemplates = async (req, res) => {
    const templates = await getAllTemplates();
    res.json(templates);
};

export const addTemplate = async (req, res) => {
    const template = await insertTemplate(req.body.name, req.body.data);
    res.json(template);
};
