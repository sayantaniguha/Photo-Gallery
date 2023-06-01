const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'                  //how to detect which is the user
  },
  function(email, password, done){                       //"done" is the callback fn. which reports back to Passport.js

    //find a user and establish the identity
    User.findOne({email: email})  //i.e., the user is to be found through email / the 1st 'email' is the Schema field/the 2nd is 1 inside function() - the one entered by the user
    .then((user) => {
      if(!user || user.password != password) {
        console.log('Invalid Username/Password');
        return done(null, false);
      } 
      else 
        return done(null, user);  //when user is found ,it will return the 'user' to serializer
    })
    .catch((err) => {
      console.log('Error in finding user --> Passport');
      return done(err);
    });
  
}));

//serialize the user to decide which key is to be kept in the session cookies - which is encrypted & stored into session cookies using a library { express-session }
passport.serializeUser(function(user,done){
  done(null, user.id);
});

//deserialize the user from the key in cookies
passport.deserializeUser(function(id,done){
  User.findById(id)
    .then((user) => {
      if(!user) 
        return done(null, false);
      else
        return done(null, user);
    })
    .catch((err) => {
      console.log('Error in finding user  ---> Passport');
      return done(err);
    });
});

//check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
  //if the user is signed in, then pass on the request to the next function(controller's action)
  if(req.isAuthenticated())
   return next();

  //if the user is not signed in
  return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
  if(req.isAuthenticated())
   res.locals.user = req.user;    //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views

  next();
}

module.exports = passport;