import { Queue } from "bullmq";

export const videoQueue = new Queue("video-render",{
  connection:{host:"127.0.0.1",port:6379}
});
