import { google } from 'googleapis';
import fs from 'fs';

const oauth2Client = new google.auth.OAuth2(
  process.env.YT_CLIENT_ID,
  process.env.YT_CLIENT_SECRET,
  process.env.YT_REDIRECT_URI
);

export function setYoutubeCredentials(tokens) {
  oauth2Client.setCredentials(tokens);
}

export async function uploadYouTubeVideo(videoPath, title, description, tags) {
  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
  const res = await youtube.videos.insert({
    part: 'snippet,status',
    notifySubscribers: false,
    requestBody: {
      snippet: { title, description, tags },
      status: { privacyStatus: 'public' }
    },
    media: { body: fs.createReadStream(videoPath) }
  });
  return res.data;
}

export async function getYouTubeProcessingStatus(videoId) {
  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
  const res = await youtube.videos.list({ part: 'status', id: videoId });
  return res.data.items[0].status.uploadStatus;
}
