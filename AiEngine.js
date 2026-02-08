// Backend/aiEngine.js
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ANALYTICS_FILE = path.join(process.cwd(), "analytics.json");

// Generate AI content
export async function generateAIContent(clientName, industry, postTopic) {
  try {
    // Example AI prompt
    const prompt = `Create a social media post for ${clientName} in ${industry} about "${postTopic}"`;

    // If OPENAI_API_KEY is not set, fallback simulation
    if (!process.env.OPENAI_API_KEY) {
      return { post: `[SIMULATED POST] for ${clientName}: ${postTopic}` };
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const postContent = response.choices[0].message.content;

    // Save to analytics
    const analytics = JSON.parse(fs.readFileSync(ANALYTICS_FILE, "utf-8") || "{}");
    analytics[clientName] = analytics[clientName] || [];
    analytics[clientName].push({ postTopic, postContent, likes: 0, shares: 0, comments: 0 });
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(analytics, null, 2));

    return { post: postContent };
  } catch (err) {
    console.error(err);
    return { post: "[SIMULATED POST]" };
  }
}

// Fetch analytics
export async function getAnalytics() {
  if (!fs.existsSync(ANALYTICS_FILE)) {
    fs.writeFileSync(ANALYTICS_FILE, "{}");
  }
  const data = JSON.parse(fs.readFileSync(ANALYTICS_FILE, "utf-8"));
  return data;
}
