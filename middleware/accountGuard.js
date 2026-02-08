export function accountGuard(req, res, next) {

  if (req.user?.suspended) {
    return res.status(403).json({ error: 'Account suspended' })
  }

  next()
}
