import express from "express";
import Template from "../models/Template.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Create template
router.post("/", authMiddleware, async (req, res) => {
  try {
    const template = new Template({ ...req.body, creatorId: req.user.id });
    await template.save();
    res.json(template);
  } catch (err) {
    res.status(500).json({ error: "Failed to create template", details: err });
  }
});

// Get all templates
router.get("/", async (req, res) => {
  const templates = await Template.find({});
  res.json(templates);
});

// Get templates by industry or tags
router.get("/search", async (req, res) => {
  const { industry, tags } = req.query;
  const query = {};
  if (industry) query.industry = industry;
  if (tags) query.tags = { $in: tags.split(",") };
  const templates = await Template.find(query);
  res.json(templates);
});

// Buy / Download template (tier check)
router.post("/:id/apply", authMiddleware, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ error: "Template not found" });
    if (!template.tierAccess.includes(req.user.tier))
      return res.status(403).json({ error: "Your tier cannot access this template" });

    // Apply template logic here
    res.json({ message: "Template applied successfully", template });
  } catch (err) {
    res.status(500).json({ error: "Failed to apply template", details: err });
  }
});

export default router;
