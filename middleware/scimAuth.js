// scim.hardening.js
const rateLimit = require("express-rate-limit");

// SCIM endpoint rate limiter
const scimRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 50, // max 50 requests per IP per minute
  message: "Too many requests to SCIM endpoints, please try again later",
});

module.exports = { scimRateLimiter };
