import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';

// Rate limiter
export const limiter = rateLimit({
  windowMs: 15*60*1000, // 15 min
  max: 100
});

// Middleware to apply to app
export const securityMiddleware = (app) => {
  app.use(helmet()); // sets HTTP headers for security
  app.use(xss());    // sanitize inputs
  app.use(limiter);  // limit repeated requests
};
