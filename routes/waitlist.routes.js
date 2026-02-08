const express = require("express");
const { Pool } = require("pg");

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.post("/", async (req,res)=>{

  const { email } = req.body;

  await pool.query(
    "INSERT INTO waitlist(email) VALUES($1)",
    [email]
  );

  res.json({success:true});
});

module.exports = router;
