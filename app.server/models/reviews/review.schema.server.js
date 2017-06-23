var mongoose= require('mongoose');
var reviewSchema = mongoose.Schema({
    _userId:{type:mongoose.Schema.Types.ObjectId,ref:"userModel"},
    _movieId:{type:mongoose.Schema.Types.ObjectId,ref:"movieModel"},
    tmdbMovieId:Number,
    title:String,
    rating:Number,
    content:String,
    upVotes:Number,
    downVotes:Number
},{collection:"review"});

module.exports = reviewSchema;