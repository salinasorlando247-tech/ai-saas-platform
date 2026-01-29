import express from "express";
const router = express.Router();

// Mock analytics
router.get("/", (req, res) => {
  res.json({
    "1": { views: 1200, likes: 200, comments: 50, shares: 10 },
    "2": { views: 3400, likes: 500, comments: 90, shares: 25 }
  });
});

export default router;
