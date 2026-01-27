import express from "express";
import { db } from "../index.js";

const router = express.Router();

router.get("/", async (req, res) => {
  await db.read();
  res.json(db.data.bestPostingTime);
});

export default router;
