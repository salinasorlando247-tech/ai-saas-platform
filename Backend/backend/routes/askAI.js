import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  const { prompt } = req.body;

  res.json({
    response: `AI processed: ${prompt}`
  });
});

export default router;
