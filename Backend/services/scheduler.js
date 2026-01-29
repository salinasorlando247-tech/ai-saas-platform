const scheduledPosts = [];

export function schedulePost(data) {

  scheduledPosts.push({
    ...data,
    status: "scheduled",
    created: new Date()
  });

  return { success: true };
}

export function getScheduledPosts() {
  return scheduledPosts;
}
