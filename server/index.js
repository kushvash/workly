// server/index.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });


const io = new Server(server, {
  cors: {
    origin: "https://workly-rose.vercel.app",
    methods: ["GET", "POST"],
  },
});



let onlineUsers = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('user_online', (user) => {
    onlineUsers[socket.id] = user;
    io.emit('online_users', Object.values(onlineUsers));
    console.log(`${user.email} is online`);
  });

  socket.on('task_completed', (task) => {
    io.emit('task_notification', { message: `${task.user} completed a task: ${task.text}` });
  });

  // Join room
  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`${socket.id} joined room: ${room}`);
  });

  // Handle offer
  socket.on('offer', ({ room, offer }) => {
    socket.to(room).emit('receive_offer', offer);
  });

  // Handle answer
  socket.on('answer', ({ room, answer }) => {
    socket.to(room).emit('receive_answer', answer);
  });

  // Handle ICE candidates
  socket.on('ice_candidate', ({ room, candidate }) => {
    if (candidate) {
      io.to(room).emit('receive_ice_candidate', candidate); // Emit the candidate directly
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    delete onlineUsers[socket.id];
    io.emit('online_users', Object.values(onlineUsers));
  });


});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));