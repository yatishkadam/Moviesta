var mongoose = require('mongoose');
var movieSchema = mongoose.Schema({
    reviews:[{type:mongoose.Schema.Types.ObjectId, ref:"reviewModel"}],
    tmdbMovieId:{type:Number,unique:true},
    genre:String,
    followers:[{type:mongoose.Schema.Types.ObjectId,ref:"userModel"}],
    userRating:{type:Number,default:0}
},{collection:"movie"});


module.exports = movieSchema;