import fs from "fs";
import OpenAI from "openai";
import { generateVideoPackage } from "./videoProcessor.js";
import { autoPost } from "./socialPoster.js";
import { trackUsage } from "./core/usageTracker.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const JOBS_FILE = "./jobs/queue.json";

export async function processJobs() {
  if (!fs.existsSync(JOBS_FILE)) return;

  const data = JSON.parse(fs.readFileSync(JOBS_FILE));
  const pending = data.jobs.find(j => j.status === "queued");
  if (!pending) return;

  // Track usage
  const allowed = await trackUsage(pending.user);
  if (!allowed) {
    pending.status = "blocked";
    pending.error = "Monthly quota reached";
    fs.writeFileSync(JOBS_FILE, JSON.stringify(data, null, 2));
    return;
  }

  pending.status = "processing";
  fs.writeFileSync(JOBS_FILE, JSON.stringify(data, null, 2));

  try {
    if (pending.type === "text") {
      const result = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: pending.prompt }]
      });
      pending.output = result.choices[0].message.content;
    }

    if (pending.type === "video") {
      const result = await generateVideoPackage(pending.prompt);
      pending.output = result;
      if (pending.autoPost === true) {
        await autoPost(result.captions, pending.platform || "instagram");
      }
    }

    pending.status = "completed";
  } catch (err) {
    pending.status = "failed";
    pending.error = err.message;
  }

  fs.writeFileSync(JOBS_FILE, JSON.stringify(data, null, 2));
}
