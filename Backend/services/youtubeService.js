import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.YOUTUBE_REDIRECT_URI
);

export const getYouTubeToken = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
};

export const uploadYouTubeVideo = async (tokens, videoBuffer, title, description) => {
  oauth2Client.setCredentials(tokens);
  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  const res = await youtube.videos.insert({
    part: ["snippet", "status"],
    requestBody: {
      snippet: { title, description },
      status: { privacyStatus: "public" },
    },
    media: { body: videoBuffer },
  });

  return res.data;
};
