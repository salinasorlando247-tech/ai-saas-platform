import { processQueue } from "./jobProcessor.js";

export function startQueueRunner() {
  console.log("⚡ Queue Engine Started");

  setInterval(() => {
    processQueue();
  }, 2000); // Every 2 seconds
}
