import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export function adminOnly(req, res, next) {

  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'No token' })
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)

    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin only' })
    }

    req.user = user
    next()

  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}
