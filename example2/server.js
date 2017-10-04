/**
 * Created by davidsantamaria on 3/10/17.
 */
var express = require('express'),
    http = require('http'),
    connectionsArray = [],
    controller = require('./controller/logcontroller');


/* setting static html to be used */
var app = express().use(express.static('app')),
     server = http.Server(app),
     io = require('socket.io').listen(server);

app.use('/logs', controller.router);

app.get('/*', function  (req, res) {
    res.status(404, {status: 'not found'});
    res.end();
});

server.listen( 8888, function(){
    console.log('Server ready at http://localhost:8888');
});

// creating a new websocket
io.sockets.on('connection', function(socket) {

    console.log('Total connections:' + connectionsArray.length);
    // starting the loop only if at least there is one user connected
    if (!connectionsArray.length) {
        controller.respond(connectionsArray);
    }

    socket.on('disconnect', function() {
        var socketIndex = connectionsArray.indexOf(socket);
        console.log('socketID = %s disconnected', socketIndex);
        if (~socketIndex) {
            connectionsArray.splice(socketIndex, 1);
        }
    });

    console.log('New socket connected');
    connectionsArray.push(socket);

});

