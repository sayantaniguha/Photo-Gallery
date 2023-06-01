const mongoose = require('mongoose');       

mongoose.connect('mongodb://127.0.0.1:27017/ArtGallery_development'); //this is how mongoose connects to database
//https://www.quora.com/What-is-the-difference-between-development-test-and-production-environment

const db = mongoose.connection; //checking if mongoose has connected to the database or not
                                // 'db' is the connection between 'mongoose' and the database

db.on('error',console.error.bind(console,"Error connecting to db"));  //connection error

//For successful connection,
db.once('open' , function(){
    console.log("Successfully connected to the database");
});

module.exports = db;