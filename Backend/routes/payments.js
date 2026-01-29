import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  const { amount, method } = req.body;
  console.log(`Payment of $${amount} via ${method} received`);
  res.json({ status: "Payment successful" });
});

export default router;
