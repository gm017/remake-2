require('events').EventEmitter.defaultMaxListeners = 15;


let express = require('express');


let app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const PORT = process.env.PORT || 3000;

let server = app.listen(PORT);

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

    socket.on('disconnect', () => {
        // Decrement the player count
        playerCount--;
        console.log(playerCount);
    });


    

    socket.on('playerMove', moveMsg);

    function moveMsg(data) {
        socket.broadcast.emit('playerMove', data);
        console.log(data);
    }
}