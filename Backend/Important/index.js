import express from "express";
import cors from "cors";
import analyticsRoutes from "./routes/analytics.js";
import queueRoutes from "./routes/queue.js";
import videoEditorRoutes from "./routes/videoEditor.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/analytics", analyticsRoutes);
app.use("/api/queue", queueRoutes);
app.use("/api/video", videoEditorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
