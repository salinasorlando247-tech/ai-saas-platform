import { generateAI } from "./AIEngine.js";

export async function askAIQuestion(question) {
  try {
    const answer = await generateAI("General", question);
    return answer;
  } catch (err) {
    return "[SIMULATED ANSWER]";
  }
}
