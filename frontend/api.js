const BASE_URL = 'http://localhost:3000';

export const generatePost = async (industry, topic, client) => {
  const res = await fetch(`${BASE_URL}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ industry, topic, client }),
  });
  return res.json();
};

export const uploadFootage = async (file, industry, topic, client) => {
  const formData = new FormData();
  formData.append('video', file);
  formData.append('industry', industry);
  formData.append('topic', topic);
  formData.append('client', client);

  const res = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  return res.json();
};

export const getAnalytics = async (client) => {
  const res = await fetch(`${BASE_URL}/analytics/${client}`);
  return res.json();
};
