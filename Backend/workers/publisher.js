const cron = require("node-cron");

cron.schedule("* * * * *", async ()=>{

  console.log("Checking scheduled videos...");

  // Query scheduled posts
  // Upload to platforms (API integrations later)
});
