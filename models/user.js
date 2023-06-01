const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
       type: String,
       required: true,
       unique: true
    },
    password: {
       type: String,
       required: true
    },
    name: {
       type: String,
       required: true
    }
},  {
    timestamps: true       //Besides "email" , "password" , & "name " / it also creates the fields-'created at','updated at' , for a single document
});

const User = mongoose.model('User', userSchema);     //When you call mongoose.model() on a schema, Mongoose compiles a model for you in DataBase.
                                                              //.model() function makes a copy of schema.               https://mongoosejs.com/docs/models.html

module.exports = User;