// aiworker.js
// Simple AI worker function that interacts with OpenAI API

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function aiWorker(prompt) {
  if (!prompt) throw new Error("Prompt is required");

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });

  return completion.choices[0].message.content;
}
