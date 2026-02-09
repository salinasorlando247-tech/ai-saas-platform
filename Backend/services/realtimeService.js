let clients = [];

const realtimeService = {

  connect(socket) {
    clients.push(socket);
  },

  broadcast(event) {
    clients.forEach(socket => {
      socket.emit("analytics_update", event);
    });
  }

};

export default realtimeService;
