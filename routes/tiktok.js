import axios from 'axios';

export async function getTikTokAccessToken(clientId, clientSecret, code) {
  const res = await axios.post('https://open.tiktokapis.com/v1/oauth/token', {
    client_id: clientId,
    client_secret: clientSecret,
    code,
    grant_type: 'authorization_code'
  });
  return res.data;
}

export async function uploadTikTokVideo(accessToken, videoPath, caption) {
  const form = new FormData();
  form.append('video', videoPath);
  form.append('caption', caption);

  const res = await axios.post('https://open.tiktokapis.com/v1/video/upload', form, {
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
}

export async function refreshTikTokToken(refreshToken, clientId, clientSecret) {
  const res = await axios.post('https://open.tiktokapis.com/v1/oauth/refresh_token', {
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token'
  });
  return res.data;
}
