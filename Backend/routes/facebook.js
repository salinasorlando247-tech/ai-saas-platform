import axios from 'axios';

export async function postInstagramVideo(pageAccessToken, igUserId, videoUrl, caption) {
  const res = await axios.post(
    `https://graph.facebook.com/v16.0/${igUserId}/media`,
    { media_type: 'VIDEO', video_url: videoUrl, caption },
    { headers: { Authorization: `Bearer ${pageAccessToken}` } }
  );
  const creationId = res.data.id;
  const publishRes = await axios.post(
    `https://graph.facebook.com/v16.0/${igUserId}/media_publish`,
    { creation_id: creationId },
    { headers: { Authorization: `Bearer ${pageAccessToken}` } }
  );
  return publishRes.data;
}
