const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const IMAGE_PATH = path.join("/PostAvatar/Posts/images");

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,  //the unique _id present for every document inside the collection,User
        ref: 'User' //Schema to which it should refer        
    }
},{
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', IMAGE_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

//static methods
postSchema.statics.uploadedImage = multer({storage : storage}).single('myimage');
postSchema.statics.imagePath = IMAGE_PATH;

const Post = mongoose.model('Post', postSchema);
module.exports = Post;