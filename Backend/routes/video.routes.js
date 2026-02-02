const express = require("express");
const auth = require("../middleware/authMiddleware");
const planCheck = require("../middleware/planCheck");
const usageLimit = require("../middleware/usageLimit");

const router = express.Router();

router.post(
  "/create",
  auth,
  planCheck("starter"),
  usageLimit(),
  async (req,res)=>{
    res.json({success:true});
  }
);

router.post(
  "/bulk",
  auth,
  planCheck("pro"),
  usageLimit(),
  async (req,res)=>{
    res.json({success:true});
  }
);

router.post(
  "/auto",
  auth,
  planCheck("enterprise"),
  async (req,res)=>{
    res.json({success:true});
  }
);

module.exports = router;
