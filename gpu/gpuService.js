import { addRenderJob, processRenderJobs } from "./renderQueue.js";

export const renderVideo = (videoId) => {

  addRenderJob({ videoId });

  processRenderJobs();

  return { status: "Rendering Started" };
};
