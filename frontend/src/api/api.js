import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Auth
export const loginUser = (data) => API.post('/auth/login', data);
export const signupUser = (data) => API.post('/auth/signup', data);
export const resetPassword = (data) => API.post('/auth/reset-password', data);

// Video / AI
export const uploadManualVideo = (formData) => API.post('/manual/upload', formData);
export const generateAIVideo = (data) => API.post('/ai/generate', data);
export const approveVideo = (videoId) => API.post(`/ai/approve/${videoId}`);
export const editVideoAI = (videoId, edits) => API.post(`/ai/edit/${videoId}`, edits);

// Scheduling
export const getSchedules = () => API.get('/scheduling');
export const createSchedule = (data) => API.post('/scheduling', data);

// Analytics
export const getAnalytics = (videoId) => API.get(`/analytics/${videoId}`);

// Platform
export const connectPlatform = (data) => API.post('/platform/connect', data);
export const postToPlatform = (data) => API.post('/platform/post', data);
