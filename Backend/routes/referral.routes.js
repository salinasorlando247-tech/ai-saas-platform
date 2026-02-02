const express = require("express");
const auth = require("../middleware/authMiddleware");
const { Pool } = require("pg");

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.get("/code", auth, async (req,res)=>{

  const data = await pool.query(
    "SELECT referral_code FROM users WHERE id=$1",
    [req.user.id]
  );

  res.json(data.rows[0]);
});

module.exports = router;
