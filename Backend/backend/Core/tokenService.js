import jwt from 'jsonwebtoken'

export function generateAccess(user) {

  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '15m'
  })
}

export function generateRefresh(user) {

  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '7d'
  })
}
