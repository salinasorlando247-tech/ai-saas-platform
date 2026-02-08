import User from "./user.js";
import FacelessUsage from "./facelessUsage.js";

export async function getUserFacelessAnalytics(userId) {
  const user = await User.findById(userId);
  const usageRecords = await FacelessUsage.find({ user: userId });

  const today = new Date().toDateString();
  const todayUsage = usageRecords.filter(r => r.date.toDateString() === today);

  const data = {
    tier: user.tier,
    facelessUnlocked: user.facelessUnlocked,
    dailyLimits: {
      shortVideoMax: 3,
      longVideoMax: 1,
      shortVideoUsed: todayUsage.filter(v => v.length <= 2).length,
      longVideoUsed: todayUsage.filter(v => v.length > 2).length,
    },
    referralEarnings: user.referralEarnings || 0,
    totalVideosCreated: usageRecords.filter(r => r.fullRender).length,
  };

  return data;
}
