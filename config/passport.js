const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("./keys");

const opts = {};
//add keys and values to empty opts object
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      User.findById(payload.id)
        .then(user => {
          if (user) {
            //done is built-in callback in passport
            return done(null, user); //null = errors, user = object returned
          }
          return done(null, false); //no user found
        })
        .catch(err => console.log(err));
    }) 
  );
};