const scheduledJobs = [];

export function addSchedule(job) {

  scheduledJobs.push({
    ...job,
    status: "scheduled",
    createdAt: new Date()
  });

  return { success: true };
}

export function getSchedules() {
  return scheduledJobs;
}
