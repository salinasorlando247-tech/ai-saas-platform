require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Queue = require("bull");

const app = express();
const PORT = process.env.PORT || 5001;

// =========================
// SECURITY & PARSING
// =========================
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// DATABASE
// =========================
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Auto-initialize DB from schema.sql
(async function initDB() {
  try {
    const schemaPath = path.join(__dirname, "db/schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");
    await pool.query(schema);
    console.log("Database auto-initialized ✅");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
})();

// =========================
// MIDDLEWARE
// =========================
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// =========================
// VIDEO QUEUE
// =========================
const videoQueue = new Queue("video-jobs", { redis: process.env.REDIS_URL });

// =========================
// AUTH ROUTES
// =========================
app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password, is_beta } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const referral_code = Math.random().toString(36).substring(2, 8);
    const result = await pool.query(
      "INSERT INTO users (name,email,password,referral_code,is_beta) VALUES($1,$2,$3,$4,$5) RETURNING id,email,is_beta",
      [name, email, hashed, referral_code, is_beta || false]
    );
    const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "2h" });
    res.json({ token, email: result.rows[0].email, is_beta: result.rows[0].is_beta });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (!user.rows[0]) return res.status(401).json({ error: "Invalid credentials" });
    const match = await bcrypt.compare(password, user.rows[0].password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: "2h" });
    res.json({ token, email: user.rows[0].email, is_beta: user.rows[0].is_beta });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// VIDEO CREATION ROUTE
// =========================
app.post("/api/videos/create", authMiddleware, async (req, res) => {
  const { prompt, title, scheduled_at } = req.body;

  try {
    // Get user info
    const userRes = await pool.query("SELECT credits, is_beta FROM users WHERE id=$1", [req.user.id]);
    const user = userRes.rows[0];

    // Beta users = unlimited
    if (!user.is_beta && user.credits <= 0) {
      return res.status(403).json({ error: "Not enough credits" });
    }

    // Deduct 1 credit if not beta
    if (!user.is_beta) {
      await pool.query("UPDATE users SET credits=credits-1 WHERE id=$1", [req.user.id]);
    }

    // Insert video
    const result = await pool.query(
      "INSERT INTO videos(user_id,title,prompt,status,scheduled_at) VALUES($1,$2,$3,'queued',$4) RETURNING id",
      [req.user.id, title || "Untitled Video", prompt, scheduled_at || null]
    );

    await videoQueue.add({
      videoId: result.rows[0].id,
      userId: req.user.id,
      prompt,
      scheduled_at
    });

    res.json({
      queued: true,
      videoId: result.rows[0].id,
      remainingCredits: user.is_beta ? "Unlimited (Beta)" : user.credits - 1
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// GET USER VIDEOS
// =========================
app.get("/api/videos", authMiddleware, async (req, res) => {
  try {
    const videos = await pool.query("SELECT * FROM videos WHERE user_id=$1 ORDER BY created_at DESC", [req.user.id]);
    const user = await pool.query("SELECT credits, is_beta FROM users WHERE id=$1", [req.user.id]);
    res.json({ videos: videos.rows, credits: user.rows[0].is_beta ? "Unlimited (Beta)" : user.rows[0].credits });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// REFERRAL, ADMIN, STRIPE etc.
// Keep same as previous server.js
// =========================

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
