import { apiFetch } from './apiService.js';

export const getAnalytics = async () => apiFetch('/api/analytics');
