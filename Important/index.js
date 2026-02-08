// backend/index.js
const express = require("express");
const cors = require("cors");
const { apiLimiter } = require("./middleware/rateLimit");
const { passport } = require("./auth.sso");
const { videoQueue, worker } = require("./forgeWorkflows");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: "*" } });
global.io = io;

app.use(cors());
app.use(express.json());
app.use(apiLimiter);
app.use(passport.initialize());

// Import routes
const videoRoutes = require("./routes/video.routes");
const reportRoutes = require("./routes/reports.routes");
app.use("/api/videos", videoRoutes);
app.use("/api/reports", reportRoutes);

server.listen(process.env.PORT || 5000, () => {
  console.log(`ForgeAI backend running on port ${process.env.PORT || 5000}`);
});
