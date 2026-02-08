export async function runSchedulerJob(payload) {
  console.log("📆 Scheduler Worker Running:", payload);

  // Platform auto-post logic goes here

  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log("✅ Scheduling Complete");
}
