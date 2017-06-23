var mongoose=require('mongoose');
var reviewSchema=require('./review.schema.server');
var reviewModel=mongoose.model("reviewModel",reviewSchema);
var movieModel=require('../movie/movie.model.server');


reviewModel.createReview=createReview;
reviewModel.deleteReview= deleteReview;
reviewModel.findReview=findReview;
reviewModel.findReviewByMovieId=findReviewByMovieId;
reviewModel.findReviewByUserId=findReviewByUserId;
reviewModel.findAllReviews=findAllReviews;
module.exports= reviewModel;



//crud operations

//create review
function createReview(review){
    console.log("_______inside create review/ model_______");
    return reviewModel.create(review)
        .then(function (review) {
            console.log(review);
            movieModel.addReview(review.tmdbMovieId, review._id)
                .then(function () {
                    console.log("____AFTER ADD REVIEW CALL_____");
                });

        });
}

//delete a review
function deleteReview(reviewId,movieId) {
    return reviewModel.remove({_id:reviewId})
        .then(function () {
            movieModel.removeReview(movieId,reviewId);
        });
}

//find all review given review id
function findReview(reviewId) {
    return reviewModel.findById(reviewId);
}


//find all reviews given the movie id
function findReviewByMovieId(movieId) {
    return reviewModel.find({_movieId:movieId});
}

//find all reviews given the user id
function findReviewByUserId(userId) {
    return reviewModel.find({_userId:userId});
}


//find all reviews
function findAllReviews() {
    return reviewModel.find();
}