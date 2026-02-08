import express from "express";
import { getFacelessUsage } from "../services/faceless.service.js";

const router = express.Router();

router.get("/faceless", (req, res) => {
  const usage = getFacelessUsage(req.user);
  res.json(usage);
});

export default router;
