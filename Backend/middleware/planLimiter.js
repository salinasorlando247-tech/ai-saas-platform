import db from "../db.js";

export const checkUsage = async (req, res, next) => {
  const userId = req.user.id;

  const [sub] = await db.query(
    "SELECT plan FROM subscriptions WHERE user_id=? AND status='active'",
    [userId]
  );

  if (!sub.length) {
    return res.status(403).json({ error: "No active plan" });
  }

  const limits = {
    free: 5,
    pro: 200,
    agency: 2000
  };

  const month = new Date().toISOString().slice(0, 7);

  const [usage] = await db.query(
    "SELECT videos_generated FROM usage WHERE user_id=? AND month_year=?",
    [userId, month]
  );

  const used = usage.length ? usage[0].videos_generated : 0;

  if (used >= limits[sub[0].plan]) {
    return res.status(403).json({ error: "Monthly limit reached" });
  }

  next();
};
