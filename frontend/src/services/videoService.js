import API from "./api";

export const uploadVideo = async (formData) => {
  const res = await API.post("/videos/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const generateAI = async (prompt) => {
  const res = await API.post("/ai/generate", { prompt });
  return res.data;
};

export const approveVideo = async (videoId) => {
  const res = await API.post(`/ai/approve/${videoId}`);
  return res.data;
};

export const rejectVideo = async (videoId) => {
  const res = await API.post(`/ai/reject/${videoId}`);
  return res.data;
};
