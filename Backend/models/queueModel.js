import db from "../db.js";

// =======================
// ADD JOB TO QUEUE
// =======================

export async function addJob(type, payload) {
  const [result] = await db.query(
    "INSERT INTO job_queue (job_type, payload, status) VALUES (?, ?, 'pending')",
    [type, JSON.stringify(payload)]
  );

  return result.insertId;
}

// =======================
// FETCH NEXT JOB
// =======================

export async function getNextJob() {
  const [rows] = await db.query(
    "SELECT * FROM job_queue WHERE status='pending' ORDER BY created_at ASC LIMIT 1"
  );

  return rows[0];
}

// =======================
// UPDATE JOB STATUS
// =======================

export async function updateJobStatus(id, status) {
  await db.query(
    "UPDATE job_queue SET status=? WHERE id=?",
    [status, id]
  );
}
