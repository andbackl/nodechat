/**
 * Created by andbackl on 23/11/14.
 */

module.exports = function (io, sessionSockets) {

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

/*    io.set('authorization', authorizeSocket);

    function authorizeSocket(handshake, done) {
        if (!handshake.headers.cookie)
            return done({status: 'forbidden', reason: 'no session', source: 'socket_io'}, false);

        var cookies = cookie.parse(handshake.headers.cookie),
            signed = cookies['your_session_cookie'];

        if (!signed)
            return done({status: 'forbidden', reason: 'tampered cookie', source: 'socket_io'}, false);

        var raw = parseSignedCookie(signed, 'your_session_secret'),
            json = parseJSONCookie(raw);

        if (!json || !json.passport || !json.passport.user)
            return done({status: 'forbidden', reason: 'bad session', source: 'socket_io'}, false);

        // finally...
        var user = json.passport.user;

        handshake.user = user;

        done(null, true);
    }*/
}