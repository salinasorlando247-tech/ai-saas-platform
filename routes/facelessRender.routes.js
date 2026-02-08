import express from "express";
import { startRender, getRenderProgress } from "../services/facelessRender.service.js";

const router = express.Router();

router.post("/render", (req,res)=>{
  const { userId, length, type } = req.body;
  if (type !== "faceless") return res.status(400).json({error:"Invalid type"});
  
  const renderId = startRender(userId, length);
  res.json({ renderId });
});

router.get("/render/:renderId/progress", (req,res)=>{
  const progress = getRenderProgress(req.params.renderId);
  res.json(progress);
});

export default router;
