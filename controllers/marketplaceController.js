import MarketplaceItem from '../models/MarketplaceItem.js'

export const listItem = async (req, res) => {
  const item = await MarketplaceItem.create({
    ...req.body,
    creatorId: req.user.id
  })

  res.json(item)
}

export const browseMarketplace = async (req, res) => {
  const items = await MarketplaceItem.find()
  res.json(items)
}

export const installItem = async (req, res) => {
  const item = await MarketplaceItem.findById(req.params.id)
  item.installs++
  await item.save()

  // attach to user's AI profile
  req.user.marketplaceItems.push(item.payload)

  res.json({ success: true })
}
