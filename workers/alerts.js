const cron = require("node-cron");
const axios = require("axios");

cron.schedule("*/10 * * * *", async ()=>{

  const queueRes = await axios.get("http://localhost:5001/api/queue/status");
  if(queueRes.data.failed > 5){
    console.log("ALERT: Too many failed jobs!");
    // Add email/Slack notification here
  }

});
