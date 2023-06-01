const express = require('express');  //fetches existing instance [from index.js present directly under codeial]

const router = express.Router();  // help to separate app routes & the controller
const homeController = require('../controllers/home_controller');

console.log('Router Loaded.');


router.get('/', homeController.home);      // since 'home' is function name inside home_controller.js
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));

//for any further routes, access from here
//routers.use('/routerName', require('./routerfile'));

module.exports = router;   //to be exported to be made available to /codeial/index.js