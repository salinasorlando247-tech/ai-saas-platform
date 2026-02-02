const queue = require("../queues/videoQueue");
const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

queue.process(async job => {

  const { videoId, userId, prompt } = job.data;

  console.log("Processing job:", videoId);

  // Simulate AI processing
  await new Promise(res => setTimeout(res, 5000));

  await pool.query(
    "UPDATE videos SET status='completed', progress=100 WHERE id=$1",
    [videoId]
  );

  return true;
});
