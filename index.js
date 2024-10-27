const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');

const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(path.join(__dirname, '')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'index.html'));
});

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
    socket.on('username', (usr) => {
        console.log('username: ' + usr);
        io.emit('username', usr);;  // Store username in the socket object
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);  // Store username in the socket object
    });
});

server.listen(3000, () => {
    console.log('localhost:3000');
});
