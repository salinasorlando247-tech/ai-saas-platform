import { autoPostQueue } from '../queues/autoPost.queue.js'
import { PLATFORMS } from '../config/platforms.js'

export const autoPostEverywhere = async (req, res) => {
  const { videoId, captionBase, scheduleAt } = req.body
  const userId = req.user.id

  const masterJob = await autoPostQueue.add(
    'AUTO_POST_MASTER',
    {
      userId,
      videoId,
      captionBase,
      scheduleAt,
      platforms: PLATFORMS
    },
    { removeOnComplete: true }
  )

  res.json({
    success: true,
    message: 'ForgeAI auto-posting to all platforms',
    platforms: PLATFORMS.length,
    jobId: masterJob.id
  })
}
