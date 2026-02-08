import axios from "axios";

const GRAPH_URL = "https://graph.facebook.com/v17.0/";

export const getPageAccessToken = async (userAccessToken) => {
  const res = await axios.get(`${GRAPH_URL}me/accounts?access_token=${userAccessToken}`);
  return res.data.data; // contains pages
};

export const uploadInstagramVideo = async (pageAccessToken, videoUrl, caption) => {
  const res = await axios.post(`${GRAPH_URL}${process.env.INSTAGRAM_BUSINESS_ID}/media`, {
    video_url: videoUrl,
    caption,
    access_token: pageAccessToken,
  });
  const creationId = res.data.id;

  const publishRes = await axios.post(`${GRAPH_URL}${process.env.INSTAGRAM_BUSINESS_ID}/media_publish`, {
    creation_id: creationId,
    access_token: pageAccessToken,
  });

  return publishRes.data;
};
