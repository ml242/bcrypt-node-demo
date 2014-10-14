var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var user = new User({
  username: 'ml',
  email: 'matthew@matthew.com',
  password: 'password'
});

user.save(function(err, user){
  if(err) {
    console.log(err);
  } else {
    console.log('seeded user');
  }
});


// session serialization
passport.serializeUser(function(user, next){
  // convert user object to session-storing id
  next(null, user._id);
});

passport.deserializeUser(function(id, next){
  // convert session-stored id to user
  User.findById(id, function(err, user){
    next(err, user);
  });
});


// strategies:
var localStrategy = new LocalStrategy(
    function(username, password, next){
      User.findOne({username: username}, function(err, user){
        if(err){
          return next(err);
        }
        if(!user){
          return next(null, false);
        }
        // user matches a db doc
        user.comparePassword(password, 
          function(err, isMatch){
            if(err){
              return next(err);
            }
            if(isMatch){
              return next(null, user);
            } else {
              return next(null, false);
            }
          }
        );
      });
    }
  );

passport.use(localStrategy);