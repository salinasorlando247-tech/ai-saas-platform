import { insertTemplate, getAllTemplates } from '../models/templateModel.js';

export const addTemplate = async (name, data) => {
    return await insertTemplate(name, data);
};

export const fetchTemplates = async () => {
    return await getAllTemplates();
};
