import { getNextJob, updateJobStatus, incrementAttempts } from "../models/queueModel.js";
import { runVideoJob } from "../workers/videoWorker.js";
import { runSchedulerJob } from "../workers/schedulerWorker.js";
import { runAnalyticsJob } from "../workers/analyticsWorker.js";

let processing = false;

export async function processQueue() {
  if (processing) return;

  processing = true;

  try {
    const job = await getNextJob();

    if (!job) {
      processing = false;
      return;
    }

    await updateJobStatus(job.id, "processing");

    const payload = JSON.parse(job.payload);

    switch (job.type) {
      case "VIDEO":
        await runVideoJob(payload);
        break;

      case "SCHEDULE":
        await runSchedulerJob(payload);
        break;

      case "ANALYTICS":
        await runAnalyticsJob(payload);
        break;

      default:
        console.log("Unknown job type:", job.type);
    }

    await updateJobStatus(job.id, "completed");

  } catch (err) {
    console.error("JOB FAILED:", err);
    if (job?.id) {
      await incrementAttempts(job.id);
      await updateJobStatus(job.id, "failed");
    }
  }

  processing = false;
}
