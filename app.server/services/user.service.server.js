var app=require('../../express');
var passport = require('passport');
var bcrypt = require("bcrypt-nodejs");
var LocalStrategy= require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
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
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/index.html#!/',
        failureRedirect: '/#/login'
    }));

app.put    ("/api/user/:userId/follow/:followingId",follow);

app.delete ("/api/user/:userId/unfollow/:followingId",unfollow);




var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};
passport.use(new GoogleStrategy(googleConfig, googleStrategy));
function localStrategy(username,password, done) {
    userModel.findUserByCredentials(username,password)
        .then(function (user) {
                if(user){
                    done(null,user);
                }
                else{
                    done(null,false);
                }
            },function (error) {
                done(error,false);

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
//add to followers when someone follows a user
function follow(req,res) {
    var follower=req.params.userId;
    var following=req.params.followingId;
    var newFollow= new Object();
    newFollow.follower=follower;
    newFollow.following=following;
    //console.log(newFollow);
    followModel.createFollow(newFollow)
        .then(function (response) {
                res.sendStatus(200)
            },
            function (err) {
                res.sendStatus(404);
            });
}

//remove user from following
function unfollow(req,res) {
    var follower=req.params.userId;
    var following=req.params.followingId;
    //console.log(following);
    //console.log(follower);
    followModel.deleteFollow(follower,following)
        .then(function (response) {
                console.log(response);
                res.sendStatus(200);
            },
            function (err) {
                res.sendStatus(404);
            });
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
    res.json(req.user);
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
    userModel.deleteUser(userId)
        .then(function (status) {
            res.json(status);
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
