// scriptEngine.js
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function simulateScript({ topic, industry, format }) {
  return {
    simulated: true,
    format,
    content: `
[SIMULATED SCRIPT]

Industry: ${industry}
Topic: ${topic}
Format: ${format}

HOOK:
Start with a bold statement or question that interrupts scrolling.

KEY POINTS:
- Point 1: Main insight
- Point 2: Supporting idea
- Point 3: Actionable takeaway

CTA:
Tell the viewer exactly what to do next (comment, follow, save).
`,
  };
}

export async function generateScript({
  topic,
  industry,
  preferredFormat = "auto", // short | long | auto
}) {
  const format =
    preferredFormat === "auto"
      ? topic.length < 60
        ? "short-form"
        : "long-form"
      : preferredFormat;

  const prompt = `
You are a content strategist helping a HUMAN creator.

Create a ${format} content script for:
Industry: ${industry}
Topic: ${topic}

Requirements:
- Clear hook
- Talking points (not full paragraphs)
- Creator-friendly (spoken language)
- Strong CTA
- Optimized for retention
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return {
      simulated: false,
      format,
      content: response.choices[0].message.content.trim(),
    };
  } catch (error) {
    console.warn("⚠️ Script generation failed. Using simulation.");
    return simulateScript({ topic, industry, format });
  }
}
