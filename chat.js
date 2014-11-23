/**
 * Created by andbackl on 23/11/14.
 */

module.exports = function (io) {

    io.on('connection', function (socket) {

        var nick = null;

        // Handel nick change
        socket.on('nick', function (nickname) {

            var oldnick = nick;
            nick = nickname;
            console.log("nick changed");
            if (oldnick != null)
                io.emit('chat message', "Nick changed: " + oldnick + " is now " + nick);
            else
                io.emit('chat message', "New user join chat " + nick);

        });

        // Distribute incoming chat messages
        socket.on('chat message', function (msg) {
            if (nick == null)
                return;
            io.emit('chat message', nick + ": " + msg);
        });
    });
}