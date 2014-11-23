/**
 * Created by andbackl on 12/11/14.
 */

var express     =   require('express');
var app         =   express();
var http        =   require('http').Server(app);
var io          =   require('socket.io')(http);
var passport    =   require('passport');



// routes ======================================================================
require('./routes.js')(app, passport, express); // load our routes and pass in our app and fully configured passport

// chat ======================================================================
require('./chat.js')(io);

// auth ======================================================================
require('./auth.js')(passport);


// Start server
http.listen(3000, function () {
    console.log('listening on *:3000');
});

