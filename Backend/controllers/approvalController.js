import VideoApproval from '../models/VideoApproval.js'
import { autoPostQueue } from '../queues/autoPost.queue.js'

export const submitForApproval = async (req, res) => {
  const { videoId, aiConfidenceScore, aiReasoning } = req.body

  const approval = await VideoApproval.create({
    videoId,
    userId: req.user.id,
    aiConfidenceScore,
    aiReasoning
  })

  res.json({ success: true, approval })
}

export const approveVideo = async (req, res) => {
  const approval = await VideoApproval.findById(req.params.id)

  approval.status = 'approved'
  approval.approvedBy = req.user.id
  await approval.save()

  await autoPostQueue.add('AUTO_POST_MASTER', {
    videoId: approval.videoId,
    userId: approval.userId
  })

  res.json({ success: true })
}

export const rejectVideo = async (req, res) => {
  const approval = await VideoApproval.findById(req.params.id)

  approval.status = 'rejected'
  approval.overrideReason = req.body.reason
  await approval.save()

  res.json({ success: true })
}

export const overrideAI = async (req, res) => {
  const approval = await VideoApproval.findById(req.params.id)

  approval.status = 'overridden'
  approval.overrideReason = req.body.reason
  approval.approvedBy = 'system'
  await approval.save()

  res.json({ success: true })
}
