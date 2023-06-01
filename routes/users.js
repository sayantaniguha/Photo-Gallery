const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller.js');

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);  //make the profile page accessible only when the user is signed in
router.get('/sign-up',usersController.signUp);     //will be made a POST request 
router.get('/sign-in',usersController.signIn); 

router.post('/create',usersController.create);

//Manual Authentication
// router.post('/create-session',usersController.createSession);

//use passport as a middleware to authenticate 
router.post('/create-session', passport.authenticate(
    'local',                                             //i.e., local strategy
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

router.get('/sign-out',usersController.destroySession);

module.exports = router;