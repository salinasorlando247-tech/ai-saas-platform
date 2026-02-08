export const scheduleToPlatform = async (post, immediate = false) => {
  // Placeholder: integrate with APIs of top 20 social platforms
  if (immediate) {
    console.log(`Posting ${post._id} to ${post.platform} now`);
  } else {
    console.log(`Scheduled ${post._id} to ${post.platform} at ${post.scheduledAt}`);
  }
};
