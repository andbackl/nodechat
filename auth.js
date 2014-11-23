/**
 * Created by andbackl on 23/11/14.
 */
module.exports = function (passport) {

    var FacebookStrategy = require('passport-facebook').Strategy;

    var FACEBOOK_APP_ID = "701931776569852";
    var FACEBOOK_APP_SECRET = "f47adbeab07f0377f7a04dcca8104f86";

    passport.use(new FacebookStrategy({
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:3000/auth/facebook/callback"
        },
        function (accessToken, refreshToken, profile, done) {
            //    User.findOrCreate(..., function(err, user) {
            //        if (err) { return done(err); }
            //        done(null, user);
            //    });
        }
    ));
};