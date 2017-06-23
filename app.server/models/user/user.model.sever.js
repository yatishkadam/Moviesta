var mongoose=require('mongoose');
var userSchema= require("./user.schema.sever");
var userModel=mongoose.model("userModel",userSchema);
var bcrypt = require("bcrypt-nodejs");
userModel.createUser=createUser;
userModel.findUserById=findUserById;
userModel.findAllUser=findAllUser;
userModel.findUserByUsername=findUserByUsername;
userModel.findUserByCredentials=findUserByCredentials;
userModel.updateUser=updateUser;
userModel.deleteUser=deleteUser;
userModel.findUserByGoogleId=findUserByGoogleId;
userModel.addToFollowers=addToFollowers;
userModel.addToFollowing=addToFollowing;
userModel.removeFollowing=removeFollowing;
userModel.removeFollower=removeFollower;
module.exports=userModel;

// crud and few other functions that can be performed on the database
//create user
function createUser(user) {
    return userModel.create(user);
}

// get a user by the given username
function findUserByUsername(username) {
    return userModel.findOne({username:username});
}

//get the user by credentials
function findUserByCredentials(username,password) {
    return userModel.findOne({username: username})
        .select('password')
        .then(
            function (user) {

                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        user.password = null;
                        return user;
                    }
                }
                return null;
            }
        );
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id':googleId});
}

//find a particular user
function findUserById(userId) {
    return userModel.findById(userId);
}

//get all the user
function findAllUser() {
    return userModel.find();
}


// update user
function updateUser(userId,newUser) {
    delete newUser.username;
    delete newUser.password;
    return userModel.update({_id:userId},{$set:newUser});
}


//delete user
function deleteUser(userId) {
    return userModel.findById(userId)
        .then(function (user) {
            cleanup(user)
                .then(function () {
                    return userModel.remove({_id:userId});
                });
        });

}


// add to followers
function addToFollowers(userId,followerId){
    return userModel.findById(userId)
        .then(function (user) {
           user.followers.push(followerId);
           return user.save();
        });
}

// add to following
function addToFollowing(userId,followingId) {
    return userModel.findById(userId)
        .then(function (user) {
            user.following.push(followingId);
            return user.save();
        })
}

//remove follower
function removeFollower(userId,followerId) {
    return userModel.findById(userId)
        .then(function (user) {
            var index= user.followers.indexOf(followerId);
            user.followers.splice(index,1);
            return user.save();
        })
}

function removeFollowing(userId,followingId) {
    return userModel.findById(userId)
        .then(function (user) {
            var index=user.following.indexOf(followingId);
            user.following.splice(index,1);
            return user.save();
        });
}

//HELPER FUNCTIONS

//to clean up all the details of the user and related details of the user
function cleanup(user) {
    for (var v in user.followers){
        removeFollower()
    }

}