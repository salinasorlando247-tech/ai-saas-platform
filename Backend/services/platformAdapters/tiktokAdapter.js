export const postContent = async (payload) => {

  console.log("Posting to TikTok:", payload.caption);

  return {
    success: true,
    platform: "TikTok",
    postId: "TT_" + Date.now()
  };
};
