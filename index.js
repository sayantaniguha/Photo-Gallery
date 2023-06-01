const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 4000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo'); 

// const sassMiddleware = require('node-sass-middleware');

// app.use(sassMiddleware({
//     src: './assets/scss',
//     dest: './assets/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'
// }));

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

//make the PostAvatar path available to the user
app.use('/PostAvatar', express.static(__dirname + '/PostAvatar'));

//we put these before 'views' because this layout is going to be used in our 'home.ejs' & 'user_profile.ejs'
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//Mongo-Store  is used to store the session into the db
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',     //'secret' is used to encrypt the session cookie
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: (1000 * 60 * 100) },
    store: MongoStore.create(                 //where to store the session cookies
        { 
            mongoUrl : 'mongodb://127.0.0.1:27017/ArtGallery_development',
            autoRemove: 'disabled'           //I dont want to remove session cookies automatically
        },
        function(err)
        { console.log(err ||  'connect-mongodb setup ok'); }
    )
}));

app.use(passport.initialize());  //tell app to use passport
app.use(passport.session());     //tell app to create session
app.use(passport.setAuthenticatedUser); //if session cookie is present , it will pass that on to make it accessible in views...

//use  express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err)
       console.log(`Error in running the server: ${err}`);

    console.log(`Server is running on port: ${port}`);
});