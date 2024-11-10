// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

// Enable CORS for Socket.io
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:8081", // Allow your Vue.js frontend to connect
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('A new client connected');
    
    // Send a welcome message
    socket.emit('message', 'Welcome to the Socket.io server!');

    // Handle client messages and broadcast them
    socket.on('clientMessage', (msg) => {
        console.log('Received message from client:', msg);
        // Broadcast the message to all clients except the sender
        socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
