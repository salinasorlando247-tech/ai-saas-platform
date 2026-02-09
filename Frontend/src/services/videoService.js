import { apiFetch } from './apiService.js';

export const createVideo = async (videoData) => apiFetch('/api/video/create', { method:'POST', body: JSON.stringify(videoData) });
export const getTemplates = async () => apiFetch('/api/templates');
