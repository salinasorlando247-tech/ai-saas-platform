// src/middleware/enterpriseAccess.js

export function enforceReadOnly(req, res, next) {
  if (req.user.role === "ENTERPRISE_VIEWER") {
    if (["POST", "PUT", "DELETE"].includes(req.method)) {
      return res.status(403).json({
        error: "Read-only enterprise access",
      });
    }
  }
  next();
}
