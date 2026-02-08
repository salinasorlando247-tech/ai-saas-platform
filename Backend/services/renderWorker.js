export async function renderInSandbox(job) {
  try {
    return await job.execute();
  } catch (err) {
    return {
      status: "failed",
      safeRetry: true
    };
  }
}
