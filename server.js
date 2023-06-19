let express = require('express');

let app = express();
let server = app.listen(3000);

app.use(express.static('public'));

let socket = require('socket.io');

let io = socket(server);

let playerCount = 0;

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection:' + socket.id);

    if (playerCount < 2) {
        playerCount++;
        console.log(playerCount);
    } else {
        socket.emit('gameFull');
        socket.disconnect();
    }

    socket.on('playerMove', moveMsg);

    function moveMsg(data) {
        socket.broadcast.emit('playerMove', data);
        console.log(data);
    }
}