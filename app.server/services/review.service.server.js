var app=require('../../express');
var reviewModel = require('../models/reviews/review.model.server');


app.get   ("/api/reviews",getAllReviews);
app.post  ("/api/review/:userId/:movieId",createReview);
//app.put   ("api/review",updateReview);
app.get   ("/api/getReviewByMovieId/:movieId",getReviewByMovieId);
app.get   ("/api/getReviewByUserId/:userId",getReviewByUserId);
app.delete("/api/movie/:movieId/review/:reviewId",deleteReview);
app.get   ("/api/review/:reviewId",findReview);
app.put   ("/api/review/upvote/:reviewId",updateUpvote);
app.put   ("/api/review/downvote/:reviewId",downVote);



//create review
function createReview(req,res) {
    //console.log("________inside create review_______");
    var review=req.body;
    //console.log(review);
    //review.userId=req.params.userId;
    review._movieId=req.params.movieId;
    //console.log(review.userId);
    //console.log(review.movieId);
    //console.log("review->>\n");
    //console.log(review);
    reviewModel.createReview(review)
        .then(function (response) {
            //console.log(response);
           res.sendStatus(200);
        });
}

//delete review
function deleteReview(req,res) {
    var reviewId=req.params.reviewId;
    var movieId=req.params.movieId;
    reviewModel.deleteReview(reviewId,movieId)
        .then(function (response) {
            res.sendStatus(200);
        });
}

//get all reviews
function getAllReviews(req,res) {
    reviewModel.findAllReviews()
        .then(function (response) {
            //console.log(response);
            res.json(response);
        });
}

//get reviews by userId
function getReviewByUserId(req,res) {
    var userId=req.params.userId;
    reviewModel.findReviewByUserId(userId)
        .then(function (reviews) {
            console.log(reviews);
            res.json(reviews);
        });
}

function getReviewByMovieId(req,res) {
    var movieId= req.params.movieId;
    reviewModel.findReviewByMovieId(movieId)
        .then(function (reviews) {
            console.log(reviews);
            res.json(reviews);
        });
}

function findReview(req,res) {
    var reviewId=req.params.reviewId;
    reviewModel.findReview(reviewId)
        .then(function (response) {
            res.json(response);
        });
}


function updateUpvote(req,res) {
    var reviewId=req.params.reviewId;
    reviewModel.updateUpvote(reviewId)
        .then(function (response) {
            res.json(response);
        });
}

function downVote(req,res) {
    var reviewId=req.params.reviewId;
    reviewModel.updateDownvote(reviewId)
        .then(function (response) {
            res.json(response);
        });
}