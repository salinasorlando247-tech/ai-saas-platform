const express = require("express");
const auth = require("../middleware/authMiddleware");
const { Pool } = require("pg");

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

router.post("/add", auth, async (req,res)=>{

  const { title, date } = req.body;

  await pool.query(
    "INSERT INTO content_calendar(user_id,title,scheduled_date) VALUES($1,$2,$3)",
    [req.user.id, title, date]
  );

  res.json({ success:true });
});

router.get("/all", auth, async (req,res)=>{

  const data = await pool.query(
    "SELECT * FROM content_calendar WHERE user_id=$1 ORDER BY scheduled_date",
    [req.user.id]
  );

  res.json(data.rows);
});

module.exports = router;
