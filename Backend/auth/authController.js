import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";

export const signup = async (req, res) => {
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 12);

  await db.query(
    "INSERT INTO users (email,password_hash) VALUES (?,?)",
    [email, hash]
  );

  res.json({ success: true });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.query(
    "SELECT * FROM users WHERE email=?",
    [email]
  );

  if (!rows.length) return res.status(401).json({ error: "Invalid login" });

  const user = rows[0];

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ error: "Invalid login" });

  const accessToken = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ accessToken, refreshToken });
};
