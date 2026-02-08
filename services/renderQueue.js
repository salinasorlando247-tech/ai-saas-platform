const queues = {
  elite: [],
  pro: [],
  starter: [],
  free: []
};

export function enqueueRenderJob(job) {
  queues[job.tier].push(job);

  return {
    status: "queued",
    tier: job.tier,
    position: queues[job.tier].length
  };
}

export function processNextJob() {
  const order = ["elite", "pro", "starter", "free"];

  for (const tier of order) {
    if (queues[tier].length > 0) {
      return queues[tier].shift();
    }
  }

  return null;
}
