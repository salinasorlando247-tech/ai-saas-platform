export const postContent = async (payload) => {

  console.log("Posting to Instagram");

  return {
    success: true,
    platform: "Instagram",
    postId: "IG_" + Date.now()
  };
};
