import { Server } from 'socket.io'

let io

export const initSocket = server => {
  io = new Server(server, {
    cors: {
      origin: '*'
    }
  })

  io.on('connection', socket => {
    socket.on('join', userId => {
      socket.join(userId)
    })
  })
}

export const emitProgress = (userId, payload) => {
  if (io) {
    io.to(userId).emit('progress', payload)
  }
}
