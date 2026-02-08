export const logAIAction = (req, res, next) => {
  console.log(`[AI ACTION] User: ${req.user?.id || "guest"} - Endpoint: ${req.originalUrl}`);
  next();
};
