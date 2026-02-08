const express = require("express");
const upload = require("../services/uploadService");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, upload.single("file"), (req,res)=>{
  res.json({ url:req.file.location });
});

module.exports = router;
