const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

router.post("/convert", async (req, res) => {
  const { userId, credits } = req.body;
  if (!userId || !credits || credits <= 0) return res.status(400).json({ message: "Invalid request" });

  try {
    const cashAmount = credits / 100;
    await pool.query(
      "UPDATE users SET cash_balance = COALESCE(cash_balance,0) + $1, credits = credits - $2 WHERE id=$3",
      [cashAmount, credits, userId]
    );

    res.status(200).json({ message: "Credits converted to cash successfully", cashAmount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
