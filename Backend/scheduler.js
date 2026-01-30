import cron from "node-cron";

const scheduler = () => {
  console.log("✅ Main backend scheduler started");

  cron.schedule("*/5 * * * *", () => {
    console.log("⏱ Running scheduled backend job...");
  });
};

export default scheduler;
