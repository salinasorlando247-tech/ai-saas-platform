export function facelessGuard(req, res, next) {
  const user = req.user;

  if (user.tier !== "free") return next();

  if (!user.facelessUnlocked) {
    return res.status(402).json({
      error: "Faceless videos require the $5/month unlock"
    });
  }

  next();
}
