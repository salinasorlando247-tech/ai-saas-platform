import express from 'express'
import auth from '../middleware/auth.js'
import {
  listItem,
  browseMarketplace,
  installItem
} from '../controllers/marketplaceController.js'

const router = express.Router()

router.post('/list', auth, listItem)
router.get('/browse', browseMarketplace)
router.post('/install/:id', auth, installItem)

export default router
