const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthentication, postsController.create); /* 
passport.checkAuthentication  -
We will put a check on the action level so that no one other than who is signed in is able to post something
I am not letting the user penetrate into my action without passing the check of authentication
So, if the user isn't signed in, he/she wouldn't be able to reach the action of /posts/create */
router.get('/destroy/:id', passport.checkAuthentication, postsController.destroy); 

module.exports = router;