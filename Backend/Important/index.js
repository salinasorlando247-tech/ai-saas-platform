import express from "express";
import cors from "cors";
import multer from "multer";
import aiRouter from "./routes/ai.js";
import queueRouter from "./routes/queue.js";
import paymentsRouter from "./routes/payments.js";
import analyticsRouter from "./routes/analytics.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Multer for file uploads
const upload = multer({ dest: "uploads/" });

// Routes
app.use("/api/ai", aiRouter(upload));
app.use("/api/queue", queueRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/analytics", analyticsRouter);

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
