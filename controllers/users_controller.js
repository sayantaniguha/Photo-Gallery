const User = require('../models/user');
const Post = require('../models/post');

module.exports.profile = function(req, res){
    //USING MANUALLY CREATED COOKIES
    // if (req.cookies.user_id)
    // {
    //     User.findById(req.cookies.user_id)
    //     .then((user) => {
    //         if(user)
    //             return res.render('user_profile', { title: "User Profile", user: user});
    //         else
    //             return res.redirect('/users/sign-in');
    //     })
    //     /* .catch((err) => {
    //       console.log(err);
    //       return res.redirect('/users/sign-in');
    //     }); */
    // }
    // else
    //     return res.redirect('/users/sign-in'); 

    User.findById(req.params.id)
    .then(user => {
         Post.find({ user: user._id })
          .populate('user')
          .then(posts => {
             return res.render('user_profile', {
                title: 'User Profile',
                profile_user: user,
                posts: posts
             });
          })
    .catch(error => {
       // Handle the error
    });
 }); 
}

module.exports.signUp = function(req, res) {
    //USING MANUALLY CREATED COOKIES
    // if(req.cookies.user_id)
    //    return res.redirect('/users/profile');   //If user is signed in & goes to http://localhost:8000/users/sign-up he will be redirected to profile page
    // else
    //    return res.render('user_sign_up', {title: 'Codeial | Sign Up'});

    //USING PASSPORTJS
    if(req.isAuthenticated())
       return res.redirect('/users/profile');   //If user is signed in & goes to http://localhost:8000/users/sign-up he will be redirected to profile page
    else
       return res.render('user_sign_up', {title: 'Codeial | Sign Up'});
}

module.exports.signIn = function(req, res) {
    //USING MANUALLY CREATED COOKIES
    // if(req.cookies.user_id)
    //    return res.redirect('/users/profile');   //If user is signed in & goes to http://localhost:8000/users/sign-in he will be redirected to profile page
    // else
    //    return res.render('user_sign_in', {title: 'Codeial | Sign In'});

    //USING PASSPORTJS
    if(req.isAuthenticated())
       return res.redirect('/users/profile');   //If user is signed in & goes to http://localhost:8000/users/sign-in he will be redirected to profile page
    else
       return res.render('user_sign_in', {title: 'Codeial | Sign In'});
}

//get the signup data
module.exports.create = function(req, res)
{
    if(req.body.password != req.body.confirm_password)
        return res.redirect('back');

        //cuz email is unique for every user
        User.findOne({ email: req.body.email })
            .then((user) => {
                if(!user) 
                   return User.create(req.body);
                else
                   throw new Error('User already exists'); //it will immediately terminate the current promise chain and trigger the catch() method
            })
            .then(() => {
                return res.redirect('/users/sign-in');
            })
            .catch((err) => {

                //If user already exists OR if error in finding user(by email) while signing up - In both cases, error message will be displayed accordingly
                console.error(`Error in user sign-up: ${err}`);
                return res.redirect('back');
            });

}

//sign-in & create a session for the user
module.exports.createSession = function(req, res){

    // steps to authenticate[MANUAL AUTHENTICATION VERSION]

    // find the user
    // User.findOne({ email: req.body.email })

        // handle user
        // .then((user) => {
        //     // handle user not found
        //     if (!user) 
        //         return res.redirect('/users/sign-up');
            
        //     // handle password which doesn't match
        //     else if (user.password !== req.body.password) 
        //              return res.redirect('back');
            
        //     // handle session creation when user is found
        //     else 
        //     {
        //      res.cookie('user_id', user.id);
        //      return res.redirect('/users/profile');
        //     }
        // })
        // .catch((err) => {
        //     console.log(`error in finding user in signing up: ${err}`); 
        //     return res.redirect('back');
        // });


    //AUTHENTICATION USING PASSPORTJS
    return res.redirect('/');

}

module.exports.destroySession = function(req, res){

   //MANUAL LOGOUT
   // Clear the user_id cookie to log the user out
   // if(req.cookies.user_id)
      // res.clearCookie('user_id');

      // Redirect the user to the sign-in page
      // return res.redirect('back');


   //LOGOUT USING PASSPORTJS
   req.logout(function(err) {  //function from passportJS
     if(err) 
        return next(err);

     return res.redirect('/');
   });
}