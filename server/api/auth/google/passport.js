'use strict';

var passport = require('passport');


var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
 

exports.setup = function(User, config) {
  const GOOGLE_APP_ID = config.appID;
  const GOOGLE_APP_SECRET = config.appSecret;
  const callbackURL = config.callbackUrl;

  passport.use(new GoogleStrategy({
      clientID: GOOGLE_APP_ID,
      clientSecret: GOOGLE_APP_SECRET,
      callbackURL: callbackURL,
      passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
      //check user table for anyone with a GOOGLE ID of profile.id
      User.findOne({
        'google.id': profile.id
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        //No user was found... so create a new user with values from GOOGLE (all the profile. stuff)
        if (!user) {

          var email = profile.emails? profile.emails[0].value : '';
          user = new User({
            name: profile.displayName,
            email: email,
            username: profile.username || profile.displayName,
            created: new Date(),
            //now in the future searching on User.findOne({'GOOGLE.id': profile.id } will match because of this next line
            google: profile._json
          });
          user.save(function(err) {
            if (err) {
              console.log(err);
            }
            return done(err, user);
          });
        } else {
          //found user. Return
          return done(err, user);
        }
      });
    }
  ));
};