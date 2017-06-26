var mongoose= require('mongoose');
var reviewSchema = mongoose.Schema({
    _userId:{type:mongoose.Schema.Types.ObjectId,ref:"userModel"},
    _movieId:{type:mongoose.Schema.Types.ObjectId,ref:"movieModel"},
    tmdbMovieId:Number,
    author:String,
    rating:Number,
    content:String,
    upVotes:[{type:mongoose.Schema.Types.ObjectId,ref:"userModel"}],
    downVotes:[{type:mongoose.Schema.Types.ObjectId,ref:"userModel"}],
    tally:{type:Number,default:0}
},{collection:"review"});

module.exports = reviewSchema;