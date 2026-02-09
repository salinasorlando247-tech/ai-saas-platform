const express = require("express");

const router = express.Router();

router.post("/video-complete", (req,res)=>{

  const { videoId } = req.body;

  console.log("Webhook received for video:", videoId);

  res.json({ received:true });
});

module.exports = router;
