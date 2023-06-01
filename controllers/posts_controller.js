const Post = require('../models/post');
// const { post } = require('../routes');

// module.exports.create = async function(req, res) {
//     let random='/';
//     Post.uploadedImage(req, res, async function(err){
//          if(err) { console.log('****Multer Error : ', err); }

//          if(req.file){
//             random = Post.imagePath + '/' + req.file.fileName;
//          }

//          const post = await Post.create({
//             content: random,
//             user: req.user._id         //through setAuthenticatedUser() function
//         });
    
//         if (!post) {
//             console.log('error in creating a post');
//             return;
//         }

//          post.save();
//          return res.redirect('back');
//     });
// }

module.exports.create = async function (req, res){
    await Post.uploadedImage(req, res, async function (err){
        if(err) { console.log('****Multer Error : ', err); }

        let x='';
        if(req.file){
            // console.log(req.file);
            x = Post.imagePath + '/' + req.file.filename;
            console.log(x);
        }
        
        const post = await Post.create({
            content: x,
            user: req.user._id         //through setAuthenticatedUser() function
        });
    
        if(!post) {
            console.log('error in creating a post');
            return;
        }

        post.save();
        return res.redirect('back');
    });
}

module.exports.destroy = async function(req, res) {
    let post = await Post.findById(req.params.id);

    //Only user who created the post can delete it
    if (post.user == req.user.id) {
        console.log("Matched");
        await Post.deleteOne({ _id: post._id });
    } 
    // else
      return res.redirect('back');
}