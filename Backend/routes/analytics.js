import express from "express";

const router = express.Router();

// Sample analytics
router.get("/", (req, res) => {
  res.json([
    { platform: "YouTube", views: 1200 },
    { platform: "TikTok", views: 950 },
    { platform: "Instagram", views: 760 },
    { platform: "LinkedIn", views: 430 },
    { platform: "Snapchat", views: 210 },
  ]);
});

export default router;
