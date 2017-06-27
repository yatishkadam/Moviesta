var mongoose=require('mongoose');
var reviewSchema=require('./review.schema.server');
var reviewModel=mongoose.model("reviewModel",reviewSchema);
var movieModel=require('../movie/movie.model.server');
var userModel=require('../user/user.model.sever');


reviewModel.createReview=createReview;
reviewModel.deleteReview= deleteReview;
reviewModel.updateReview=updateReview;
reviewModel.findReview=findReview;
reviewModel.findReviewByMovieId=findReviewByMovieId;
reviewModel.findReviewByUserId=findReviewByUserId;
reviewModel.findAllReviews=findAllReviews;
reviewModel.updateDownvote=updateDownvote;
reviewModel.updateUpvote=updateUpvote;
module.exports= reviewModel;



//crud operations

//create review
function createReview(review){
    //console.log("_______inside create review/ model_______");
    return reviewModel.create(review)
        .then(function (review) {
            // console.log(review._userId);
            // console.log(review._id);
            movieModel.addReview(review.tmdbMovieId, review._id)
                .then(function (resposne) {
                    //console.log(resposne);
                    userModel.addReviewUser(review._id,review._userId);
                    //console.log("____AFTER ADD REVIEW CALL_____");
                });

        });
}

//delete a review
function deleteReview(reviewId) {
    return reviewModel.remove({_id:reviewId})
        .then(function () {
            movieModel.removeReview(reviewId);
        });
}

//uupdate Review
function updateReview(reviewId,review) {
    return reviewModel.update({_id:reviewId},{$set:review});
}
//find all review given review id
function findReview(reviewId) {
    return reviewModel.findById(reviewId);
}


//find all reviews given the movie id
function findReviewByMovieId(movieId) {
    return reviewModel.find({tmdbMovieId:movieId})
        .sort({tally:-1});
}

//find all reviews given the user id
function findReviewByUserId(userId) {
    return reviewModel.find({_userId:userId});
}


//find all reviews
function findAllReviews() {
    return reviewModel.find()
        .populate();
}

//update upvotes
function updateUpvote(reviewId,userId) {
    return reviewModel.findOne({_id:reviewId})
        .then(function (review) {
            //console.log(userId);
            //console.log("__review model__");
            var upIndex=review.upVotes.indexOf(userId);
            var downIndex=review.downVotes.indexOf(userId);
            if(downIndex!==-1){
                review.downVotes.splice(downIndex,1);
            }
            if(upIndex===-1){
                review.upVotes.push(userId);
                review.tally=review.upVotes.length-review.downVotes.length;
                return review.save();
            }
            else {
                return review.save();
            }
        });
}


//downvote upvotes
function updateDownvote(reviewId,userId) {
    return reviewModel.findOne({_id:reviewId})
        .then(function (review) {
            var upIndex=review.upVotes.indexOf(userId);
            var downIndex=review.downVotes.indexOf(userId);
            if(upIndex!==-1){
                review.upVotes.splice(upIndex,1);
            }
            if(downIndex===-1){
                review.downVotes.push(userId);
                review.tally=review.upVotes.length-review.downVotes.length;
                return review.save();
            }
            else {
                return review.save();
            }
        });
}