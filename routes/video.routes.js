import express from "express";
import { generateVideo } from "../services/aiVideoService.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  const user = req.user;

  const result = await generateVideo({
    user,
    ...req.body
  });

  res.json(result);
});

export default router;
