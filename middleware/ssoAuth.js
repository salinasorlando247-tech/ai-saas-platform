// auth.sso.js
const passport = require("passport");
const { Strategy: OAuth2Strategy } = require("passport-oauth2");
const jwt = require("jsonwebtoken");

passport.use(
  "forge-sso",
  new OAuth2Strategy(
    {
      authorizationURL: process.env.SSO_AUTH_URL,
      tokenURL: process.env.SSO_TOKEN_URL,
      clientID: process.env.SSO_CLIENT_ID,
      clientSecret: process.env.SSO_CLIENT_SECRET,
      callbackURL: process.env.SSO_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      try {
        // verify access token
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET);
        return done(null, payload);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Middleware to enforce role-based access
const enforceRole = (requiredRole) => (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role >= requiredRole) return next();
    return res.status(403).json({ error: "Insufficient permissions" });
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { passport, enforceRole };
