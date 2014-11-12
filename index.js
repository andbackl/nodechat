/**
 * Created by andbackl on 12/11/14.
 */

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

    var nick = null;

    socket.on('nick', function (nickname) {

        var oldnick = nick;
        nick = nickname;
        console.log("nick changed");
        if (oldnick != null)
            io.emit('chat message', "Nick changed: " + oldnick + " is now " + nick);
        else
            io.emit('chat message', "New user join chat " + nick);

    })

    socket.on('chat message', function(msg){
        if (nick == null)
            return;
        io.emit('chat message', nick + ": " + msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

io.emit('some event', { for: 'everyone' });

