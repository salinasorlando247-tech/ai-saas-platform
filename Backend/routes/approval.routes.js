import express from 'express'
import {
  submitForApproval,
  approveVideo,
  rejectVideo,
  overrideAI
} from '../controllers/approvalController.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/submit', auth, submitForApproval)
router.post('/:id/approve', auth, approveVideo)
router.post('/:id/reject', auth, rejectVideo)
router.post('/:id/override', auth, overrideAI)

export default router
