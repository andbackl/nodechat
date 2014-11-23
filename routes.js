/**
 * Created by andbackl on 23/11/14.
 */

module.exports = function (app, passport, express) {

    // Serve static content in public
    app.use(express.static(__dirname + '/public'));

    //Send chat page to client
    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    // Redirect the user to Facebook for authentication.  When complete,
    // Facebook will redirect the user back to the application at
    app.get('/auth/facebook', passport.authenticate('facebook'));

    // Facebook will redirect the user to this URL after approval.  Finish the
    // authentication process by attempting to obtain an access token.  If
    // access was granted, the user will be logged in.  Otherwise,
    // authentication has failed.
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));




}