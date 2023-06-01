const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function(req,res)  // home is the actionName
{
    // console.log(req.cookies);
    // res.cookie('user_id',25);

    // return res.end('<h1>Express is up for Codeial!</h1>');


    //populate the user of each post
    const posts = await Post.find({})
        .populate('user')

        const users = await User.find({});

        return res.render('home', {title: "Codeial | Home", posts, all_users: users});
}