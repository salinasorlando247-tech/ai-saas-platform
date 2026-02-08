import axios from "axios";

export const generateThumbnail = async (videoBuffer, { type }) => {
  const response = await axios.post(
    "https://api.forgeai.com/video/thumbnail",
    {
      type,
      video: videoBuffer.toString("base64"),
    },
    { responseType: "arraybuffer" }
  );

  return Buffer.from(response.data, "binary");
};
