// backend/services/tiktokService.js
import axios from 'axios';
import { getToken } from '../utils/tokenManager.js';

const API_BASE = 'https://open-api.tiktok.com';

export async function uploadVideoTikTok(userId, videoPath, caption) {
  const token = await getToken(userId);
  const formData = new FormData();
  formData.append('video', fs.createReadStream(videoPath));
  formData.append('caption', caption);

  const res = await axios.post(`${API_BASE}/video/upload/`, formData, {
    headers: { 
      Authorization: `Bearer ${token}`, 
      ...formData.getHeaders() 
    }
  });
  return res.data;
}
