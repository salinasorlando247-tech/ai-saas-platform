import jwt from "jsonwebtoken";
import multer from "multer";
import crypto from "crypto";
import fs from "fs";
import path from "path";

const {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  JWT_EXPIRES_IN = "15m",
  JWT_REFRESH_EXPIRES_IN = "7d",
  UPLOAD_DIR = "uploads",
} = process.env;

// -------------------------
// JWT Helpers
// -------------------------
export const generateToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

export const generateRefreshToken = (payload) =>
  jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });

// -------------------------
// Verify JWT & Attach User
// -------------------------
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// -------------------------
// Role-based Access Control
// -------------------------
export const permit = (...allowedRoles) => (req, res, next) => {
  if (!req.user?.role || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
  }
  next();
};

// -------------------------
// JWT Refresh Middleware
// -------------------------
export const refreshTokenMiddleware = (req, res, next) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) return next();

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    req.user = decoded;
    const newAccessToken = generateToken({ id: decoded.id, role: decoded.role });
    res.setHeader("x-access-token", newAccessToken);
  } catch (err) {
    console.error("Refresh token invalid:", err.message);
  }
  next();
};

// -------------------------
// Upload Validation (multer)
// -------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + crypto.randomBytes(4).toString("hex");
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 500 }, // 500MB max
  fileFilter: (req, file, cb) => {
    const allowed = ["video/mp4", "video/quicktime", "video/mov"];
    if (!allowed.includes(file.mimetype)) return cb(new Error("Invalid file type"));
    cb(null, true);
  },
});
