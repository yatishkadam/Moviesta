var app=require('../../express');
var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/uploads' });
var LocalStrategy= require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
var userModel = require("../models/user/user.model.sever");
var followModel= require("../models/follow/follow.model.server");
app.get    ("/api/user",findAllUsers);
app.post   ("/api/user",createUser);
app.put    ("/api/user/:userId",updateUser);
app.get    ("/api/user/:userId",findUserById);
app.delete ("/api/user/:userId",deleteUser);
app.get    ("/api/loggedin",loggedin);
app.post   ("/api/logout",logout);
app.post   ("/api/user/login", passport.authenticate('local'),login);
app.post   ("/api/register",register);
app.get    ("/auth/google",passport.authenticate('google',{scope:['profile','email']}));

app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));


app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/#!/',
        failureRedirect: '/#!/login'
    }));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/#!/profile',
        failureRedirect: '/#!/login'
    }));


app.post ("/api/upload", upload.single('myFile'), uploadImage);


var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
passport.use(new GoogleStrategy(googleConfig, googleStrategy));

function localStrategy(username,password, done) {
    userModel
        .findUserByCredentials(username,password)
        .then(function (user) {
                if(user){
                    return done(null,user);
                }
                else{
                    return done(null,false,{ message: 'Incorrect password.'});
                }
            },function (error) {
            return done(error,false);

            }
        );
}

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id).then(

        function (user) {
            console.log(profile);
            if (user) {
                return done(null, user);
            } else {
                var dName = profile.displayName;
                var emailParts = dName.split(" ");
                console.log(profile);
                var newfacebookUser = {
                    username: emailParts[0]+emailParts[1],
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    facebook: {
                        id: profile.id,
                        token: token
                    }
                };
                return userModel.createUser(newfacebookUser);
            }
        },
        function (err) {
            if (err) {
                return done(err);
            }
        }
    )
        .then(
            function (user) {
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}
function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function register(req, res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);
    userModel
        .createUser(userObj)
        .then(function (user) {
            req
                .login(user, function (status) {
                    res.send(status);
                });
        });
}

function logout(req,res) {
    req.logout();
    res.sendStatus(200);
}

function login(req,res){
    var user = req.user;
    res.json(user);
}

function loggedin(req, res) {
    //console.log(req.user);
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        //res.redirect("/login");
        res.send('0');
    }
}

//function to create user
function createUser(req,res) {
    var newUser=req.body;
    userModel.createUser(newUser)
        .then(function (newUser) {
            res.json(newUser);
        });
}

//function to delete user
function deleteUser(req,res) {
    var userId = req.params.userId;
    //console.log(userId);
    userModel.deleteUser(userId)
        .then(function (status) {
            //console.log("_________end__________");
            //console.log(status);
            res.sendStatus(200);
        });
}


//function to update user
function updateUser(req,res) {
    var newUser=req.body;
    var userId=req.params['userId'];
    userModel.updateUser(userId,newUser)
        .then(function (user) {
            //console.log(user);
            res.json(user);
        });
}

//function to find the user by id
function findUserById(req,res) {
    var userId = req.params.userId;
    userModel.findUserById(userId)
        .then(function (user) {
            res.json(user);
        },function () {
            res.sendStatus(404);
        });
}
//function to find Users
function findAllUsers(req,res) {
    username=req.query.username;
    password=req.query.password;
    if (username && password){
        userModel.findUserByCredentials(username,password)
            .then(function (user) {
                if (user===null){
                    res.sendStatus(404);
                }
                else res.json(user);
            },function () {
                res.sendStatus(404);
            });
    }
    else if(username) {
        userModel.findUserByUsername(username)
            .then(function (user) {
                if (user===null){
                    res.sendStatus(404);
                }
                else res.json(user);
            },function () {
                res.sendStatus(404);
            });
    }
    else {
        userModel.findAllUser().then(function (users) {
            res.json(users);
        });

    }
}


function uploadImage(req, res) {
    var myFile        = req.file;
    var userId = req.body.userId;
    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;
    console.log("__userId____");
    console.log(userId);
    user = userModel.findUserById(userId);
    user.url = '/uploads/'+filename;
    console.log(user.url);
    //console.log(user);
    userModel.updateUser(userId,user)
        .then(function(){
            var callbackUrl= "/#!/profile";
            res.redirect(callbackUrl);
        });
}


function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}
