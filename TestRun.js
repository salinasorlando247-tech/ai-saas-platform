import { generatePost } from "./aiEngine.js";
import { editPost } from "./editor.js";
import { queuePost, runScheduler } from "./scheduler.js";

async function runTest() {
  // Start the simulated scheduler
  runScheduler();

  // Example industries & topics to test
  const testPosts = [
    { industry: "Fitness", topic: "5-minute ab workout" },
    { industry: "Tech", topic: "Best AI tools in 2026" },
    { industry: "Marketing", topic: "How to get more Instagram followers" },
  ];

  for (const { industry, topic } of testPosts) {
    console.log("\n--- Generating post ---");
    const aiPost = await generatePost(industry, topic);
    console.log("AI Post:\n", aiPost);

    console.log("\n--- Editing post ---");
    const refined = await editPost(aiPost, industry, "Instagram");
    console.log("Refined Post:\n", refined);

    // Queue the post
    queuePost(refined);
  }
}

// Run the test
runTest();
