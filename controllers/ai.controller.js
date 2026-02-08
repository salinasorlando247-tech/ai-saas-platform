import { videoQueue } from "../queues/video.queue.js";

export async function generateVideo(req,res){
  const job = await videoQueue.add("render",{
    prompt:req.body.prompt,
    user:req.user.id
  });

  res.json({jobId:job.id});
}
