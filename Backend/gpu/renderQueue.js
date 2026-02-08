let renderJobs = [];

export const addRenderJob = (job) => {
  renderJobs.push(job);
};

export const processRenderJobs = async () => {

  if (!renderJobs.length) return;

  const job = renderJobs.shift();

  console.log("Rendering video:", job.videoId);

  setTimeout(processRenderJobs, 5000);
};
