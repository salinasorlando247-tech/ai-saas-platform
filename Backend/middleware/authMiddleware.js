import jwt from "jsonwebtoken";
import crypto from "crypto";
import { promisify } from "util";
import fs from "fs";
import path from "path";

// Load env
const {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  JWT_EXPIRES_IN = "15m",
  JWT_REFRESH_EXPIRES_IN = "7d",
} = process.env;

// -------------------------
// Optional encryption for OAuth / sensitive payload
// -------------------------
const ENCRYPTION_KEY = crypto
  .createHash("sha256")
  .update(String(JWT_SECRET))
  .digest("base64")
  .substr(0, 32); // AES-256 key

const IV_LENGTH = 16;

export const encryptToken = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

export const decryptToken = (text) => {
  const [ivHex, encryptedHex] = text.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encryptedText = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

// -------------------------
// Generate JWT
// -------------------------
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
};

// -------------------------
// Middleware: Verify JWT
// -------------------------
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded; // attach decoded payload to request
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// -------------------------
// Middleware: Role-based Access Control
// -------------------------
export const permit = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Forbidden: No role assigned" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }

    next();
  };
};

// -------------------------
// Middleware: Optional token rotation
// -------------------------
export const refreshTokenMiddleware = async (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) return next();

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    req.user = decoded;

    // Optionally issue a new access token
    const newAccessToken = generateToken({ id: decoded.id, role: decoded.role });
    res.setHeader("x-access-token", newAccessToken);

    next();
  } catch (err) {
    console.error("Refresh token invalid:", err.message);
    next();
  }
};
