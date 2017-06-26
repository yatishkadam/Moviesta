var mongoose=require("mongoose");
var followSchema=require("./follow.schema.server");
var followModel = mongoose.model("followModel",followSchema);


followModel.createFollow=createFollow;
followModel.deleteFollow=deleteFollow;
followModel.findAllFollowing=findAllFollowing;
followModel.findAllFollowers=findAllFollowers;
followModel.deleteFollowing=deleteFollowing;
module.exports = followModel;


//crud operations

//create Follow
function createFollow(newFollow) {
    return followModel.findOne({follower:newFollow.follower,following:newFollow.following})
        .then(function (response) {
            //console.log(response);
            if (response===null){
                followModel.create(newFollow);
            }
        });
}


// delete a follow
function deleteFollow(follower,following) {

    return followModel.findOne({follower:follower, following:following})
        .then(function (follow) {
            console.log(follow);
            followModel.remove({_id:follow._id})
                .then(function (response) {
                    //console.log(response);
                });
        });
}

//find followers
function findAllFollowers(followerId) {
    //console.log(followerId);
    return followModel
        .find({following:followerId})
        .populate('follower')
        .populate('following')
        .exec();
}

//find following

function findAllFollowing(userId) {
    return followModel
        .find({follower:userId})
        .populate('follower')
        .populate('following')
        .exec();
}

//delete following when user deletes profile
function deleteFollowing(userId) {
    return followModel.find({follower:userId})
        .then(function (followlist) {
            followModel.find({following:userId})
                .then(function (list) {
                    Array.prototype.push.apply(followlist,list);
                    for (var v in followlist){
                        deleteFollow(followlist[v].follower,followlist[v].following);
                        deleteFollow(followlist[v].following,followlist[v].follower);
                    }
        });
});
}



