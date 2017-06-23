var mongoose=require("mongoose");
var followSchema=require("./follow.schema.server");
var followModel = mongoose.model("followModel",followSchema);


followModel.createFollow=createFollow;
followModel.deleteFollow=deleteFollow;
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
    return followModel.findOne({follower:follower,following:following})
        .then(function (follow) {
            //console.log(follow);
            followModel.remove({_id:follow._id})
                .then(function (response) {
                    //console.log(response);
                });
        });
}


