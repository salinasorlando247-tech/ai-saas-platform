const express = require("express");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate", auth, async (req,res)=>{

  const { topic } = req.body;

  const caption = `🔥 ${topic} — Watch till the end! #viral #ai`;

  res.json({ caption });
});

module.exports = router;
