import mongoose from 'mongoose'

const CertificationSchema = new mongoose.Schema({
  userId: String,
  type: {
    type: String,
    enum: ['editor', 'agency', 'playbook']
  },
  issuedAt: Date,
  verified: Boolean
})

export default mongoose.model('Certification', CertificationSchema)
