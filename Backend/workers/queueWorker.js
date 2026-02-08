// queueWorker.js
export async function processQueue(pool) {
  setInterval(async () => {
    try {
      const [jobs] = await pool.query(
        "SELECT * FROM job_queue WHERE status = 'pending' LIMIT 1"
      );

      if (jobs.length === 0) return;

      const job = jobs[0];
      console.log("Processing job:", job);

      // Mark job as completed (simulate processing)
      await pool.query("UPDATE job_queue SET status = 'done' WHERE id = ?", [job.id]);
    } catch (err) {
      console.error("❌ Queue Worker Error:", err);
    }
  }, 2000); // check every 2 seconds
}
