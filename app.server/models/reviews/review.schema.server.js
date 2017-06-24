var mongoose= require('mongoose');
var reviewSchema = mongoose.Schema({
    _userId:{type:mongoose.Schema.Types.ObjectId,ref:"userModel"},
    _movieId:{type:mongoose.Schema.Types.ObjectId,ref:"movieModel"},
    tmdbMovieId:Number,
    title:String,
    rating:Number,
    content:String,
    upVotes:{type:Number,default:0},
    downVotes:{type:Number,default:0},
    tally:{type:Number,default:0}
},{collection:"review"});

module.exports = reviewSchema;