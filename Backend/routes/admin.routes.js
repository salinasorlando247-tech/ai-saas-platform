const express = require("express");
const auth = require("../middleware/authMiddleware");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Admin login
router.post("/login", async (req,res)=>{
  const { email, password } = req.body;
  const admin = await pool.query("SELECT * FROM admin_users WHERE email=$1",[email]);

  if(!admin.rows[0]) return res.status(401).json({error:"Invalid"});
  
  const match = await bcrypt.compare(password, admin.rows[0].password);
  if(!match) return res.status(401).json({error:"Invalid"});

  const token = require("jsonwebtoken").sign({id:admin.rows[0].id},process.env.JWT_SECRET,{expiresIn:"8h"});
  res.json({token});
});

// Metrics endpoint
router.get("/metrics", async (req,res)=>{
  const users = await pool.query("SELECT COUNT(*) FROM users");
  const videos = await pool.query("SELECT COUNT(*) FROM videos");
  const revenue = await pool.query("SELECT SUM(amount) FROM payments");

  res.json({
    totalUsers: users.rows[0].count,
    totalVideos: videos.rows[0].count,
    totalRevenue: revenue.rows[0].sum
  });
});

module.exports = router;
