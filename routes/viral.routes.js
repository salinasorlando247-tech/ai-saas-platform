const express = require("express");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/optimize", auth, async (req,res)=>{

  const { topic } = req.body;

  const result = {
    hook:"Stop scrolling!",
    caption:"This changes everything 👀",
    duration:35,
    hashtags:["#viral","#ai","#fyp"]
  };

  res.json(result);
});

module.exports = router;
