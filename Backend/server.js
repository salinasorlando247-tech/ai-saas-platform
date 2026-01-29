import express from "express";
import cors from "cors";

import paymentRoutes from "./payments.js";
import { addSchedule, getSchedules } from "./scheduler.js";

const app = express();

app.use(cors());
app.use(express.json());


// ===== AI RENDER ENDPOINT =====

app.post("/api/render", (req, res) => {

  console.log("AI render job received:", req.body);

  res.json({ status: "queued" });
});


// ===== SCHEDULER ENDPOINTS =====

app.post("/api/schedule", (req, res) => {

  const result = addSchedule(req.body);

  res.json(result);
});

app.get("/api/schedule", (req, res) => {

  res.json(getSchedules());
});


// ===== PAYMENTS =====

app.use("/api/payments", paymentRoutes);


// ===== SERVER START =====

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
