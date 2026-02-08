export function tierGuard(requiredTier) {
  return (req, res, next) => {
    const userTier = req.user.tier;

    const order = ["free", "starter", "pro", "elite"];

    if (order.indexOf(userTier) < order.indexOf(requiredTier)) {
      return res.status(403).json({
        error: "Upgrade required"
      });
    }

    next();
  };
}
