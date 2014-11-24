/**
 * Created by andbackl on 12/11/14.
 */

var express         =   require('express');
var app             =   express();
var http            =   require('http').Server(app);
var io              =   require('socket.io')(http);
var passport        =   require('passport');
var mongoose        =   require('mongoose');
var flash           =   require('connect-flash');
var morgan          =   require('morgan');
var cookieParser    =   require('cookie-parser');
var bodyParser      =   require('body-parser');
var session         =   require('express-session')

var port        =   3001;

var configDB = require('./database.js');


mongoose.connect(configDB.url); // connect to our database

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch', resave: false, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes.js')(app, passport, express); // load our routes and pass in our app and fully configured passport

// chat ======================================================================
require('./chat.js')(io);

// auth ======================================================================
require('./auth.js')(passport);

app.set('view engine', 'ejs'); // set up ejs for templating

// Start server
app.listen(port);

console.log('listening on ' + port);