import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export const createVideo = async (videoData) => {
    const res = await axios.post(${BASE_URL}/api/videos/create, videoData);
    return res.data;
};

export const postToPlatforms = async () => {
    const res = await axios.post(${BASE_URL}/api/videos/post);
    return res.data;
};
