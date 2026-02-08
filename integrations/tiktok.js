import axios from "axios";

export async function uploadTikTok(token,videoPath,caption){

  return axios.post(
    "https://open-api.tiktok.com/share/video/upload/",
    {video:videoPath, caption},
    {headers:{Authorization:`Bearer ${token}`}}
  );

}
