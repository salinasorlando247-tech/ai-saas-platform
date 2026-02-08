import axios from 'axios';
import jwt_decode from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

let token = localStorage.getItem('token');

const instance = axios.create({
  baseURL: API_URL,
  headers: { Authorization: token ? `Bearer ${token}` : '' },
});

instance.interceptors.request.use((config) => {
  token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const api = instance;

// Auth
export const signup = (data) => api.post('/auth/signup', data);
export const login = (data) => api.post('/auth/login', data);
export const verifyEmail = (token) => api.post('/auth/verify', { token });
export const resetPassword = (email) => api.post('/auth/reset-password', { email });

// Manual / AI
export const uploadVideo = (file) => {
  const form = new FormData();
  form.append('file', file);
  return api.post('/manual-editor/upload', form);
};

export const editVideo = (data) => api.post('/manual-editor/edit', data);
export const generateAI = (prompt) => api.post('/ai-video/generate', { prompt });
export const approveAI = (videoId) => api.post('/ai-video/approve', { videoId });

// Analytics / Scheduling
export const fetchAnalytics = (videoId) => api.get(`/analytics/${videoId}`);
export const scheduleVideo = (data) => api.post('/scheduling/schedule', data);

// Competitor
export const fetchCompetitor = (industry) => api.get(`/competitor/analyze?industry=${industry}`);
