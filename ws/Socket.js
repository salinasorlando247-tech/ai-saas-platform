import { Server } from "socket.io";

let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    socket.on("join-job", (jobId) => {
      socket.join(jobId);
    });
  });
};

export const emitJobProgress = (jobId, payload) => {
  if (!io) return;
  io.to(jobId).emit("job-progress", payload);
};
