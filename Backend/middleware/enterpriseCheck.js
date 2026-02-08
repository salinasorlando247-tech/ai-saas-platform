export default function enterpriseCheck(req, res, next) {
  if (!req.user || !['enterprise', 'elite'].includes(req.user.tier)) {
    return res.status(403).json({ message: 'Enterprise feature locked' })
  }
  next()
}
