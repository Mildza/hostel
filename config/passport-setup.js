const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const config = require("./database.js")
const User = require('../models/users')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

 passport.deserializeUser((id, done) => {
  User.findById(id).then(function(user) {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
  // options for google strategy
    callbackURL:'/auth/google/redirect',
    clientID:config.google.clientID,
    clientSecret:config.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // check if user exist
       
      User.findOne({googleId: profile.id})
      .then ((currentUser) => {
        if(currentUser){
              //  console.log('user is: ' + currentUser)
            done(null, currentUser)
          } else {
              new User({
              email: profile.emails[0].value,
              username: profile.displayName,
              googleId: profile.id,
              thumbnail: profile._json.image.url
              }).save()
              .then((newUser) => done(null, newUser))
          }
      })  
  })
)