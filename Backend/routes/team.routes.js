const express = require("express");
const auth = require("../middleware/authMiddleware");
const { Pool } = require("pg");

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.post("/invite", auth, async (req,res)=>{

  const { teamId, email } = req.body;

  await pool.query(
    "INSERT INTO team_members(team_id,user_email) VALUES($1,$2)",
    [teamId,email]
  );

  res.json({ success:true });
});

router.get("/members/:teamId", auth, async (req,res)=>{

  const data = await pool.query(
    "SELECT * FROM team_members WHERE team_id=$1",
    [req.params.teamId]
  );

  res.json(data.rows);
});

module.exports = router;
