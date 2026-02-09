import { apiFetch } from './apiService.js';

export const getMarketplaceReports = async () => apiFetch('/api/marketplace/reports');
export const queueMarketplaceReport = async (filters) => apiFetch('/api/marketplace/queue', { method:'POST', body: JSON.stringify(filters) });
