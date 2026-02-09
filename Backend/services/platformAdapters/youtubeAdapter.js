export const postContent = async (payload) => {

  console.log("Uploading to YouTube");

  return {
    success: true,
    platform: "YouTube",
    postId: "YT_" + Date.now()
  };
};
