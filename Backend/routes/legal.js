import express from "express";
const router = express.Router();

router.get("/terms", (_, res) => res.send("Terms of Service"));
router.get("/privacy", (_, res) => res.send("Privacy Policy"));

export default router;
