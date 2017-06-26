var app=require('../../express');
var followModel=require("../models/follow/follow.model.server");

app.get   ("/api/Follower/:userId",getFollowers);
app.put  ("/api/createFollow/:follower/:following",follow);
app.delete ("/api/unfollow/:follower/:following",unfollow);
app.get    ("/api/getFollowing/:userId",getFollowing);

//follow

function getFollowers(req,res) {
    var userId=req.params.userId;
    followModel.findAllFollowers(userId)
        .then(function (response) {
            //console.log("________server____getFollowers");
            //console.log(response);
            res.json(response);
        });
}

//add to followers when someone follows a user
function follow(req,res) {
    var follower=req.params.follower;
    var following=req.params.following;
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
    var follower=req.params.follower;
    var following=req.params.following;
    console.log(follower);
    console.log(following);
    followModel.deleteFollow(following,follower)
        .then(function (response) {
                //console.log(response);
                res.sendStatus(200);
            },
            function (err) {
                res.sendStatus(404);
            });
}


//get all following give
function getFollowing(req,res) {
    var userId=req.params.userId;
    followModel.findAllFollowing(userId)
        .then(function (response) {
            res.json(response);
        });
}