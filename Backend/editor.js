import { generateAI } from "./aiEngine.js";

export async function editPost(existingPost) {
  // Optionally edit or improve a post
  const updatedPost = await generateAI({
    clientName: existingPost.client,
    industry: existingPost.industry,
    topic: existingPost.topic + " (refined)"
  });

  return updatedPost;
}
