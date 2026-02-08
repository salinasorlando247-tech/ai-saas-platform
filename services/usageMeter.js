import Usage from '../models/Usage.js'
import { TIERS } from '../config/billing.js'

export const meterUsage = async (user, usage) => {
  const record = await Usage.findOneAndUpdate(
    { userId: user.id },
    {
      $inc: usage,
      $set: { updatedAt: new Date() }
    },
    { upsert: true, new: true }
  )

  const limits = TIERS[user.tier]

  if (record.aiSeconds > limits.aiSeconds) {
    throw new Error('AI usage limit exceeded')
  }

  if (record.gpuSeconds > limits.gpuSeconds) {
    throw new Error('GPU usage limit exceeded')
  }

  return record
}
