import mongoose from 'mongoose'

const MarketplaceItemSchema = new mongoose.Schema({
  creatorId: String,

  type: {
    type: String,
    enum: [
      'prompt_pack',
      'playbook',
      'brand_dna',
      'editing_preset',
      'workflow',
      'avatar'
    ]
  },

  title: String,
  description: String,

  price: Number, // USD
  currency: { type: String, default: 'usd' },

  payload: Object, // actual prompts / configs / rules

  installs: { type: Number, default: 0 },
  rating: { type: Number, default: 5 },

  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('MarketplaceItem', MarketplaceItemSchema)
