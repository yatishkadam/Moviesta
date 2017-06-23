var mongoose=require("mongoose");
var movieSchema=require("./movie.schema.server");
var movieModel=mongoose.model("movieModel",movieSchema);

movieModel.createMovie=createMovie;
movieModel.deleteMovie=deleteMovie;
movieModel.updateMovie=updateMovie;
movieModel.findMovieOnGenre=findMovieOnGenre;
movieModel.findAllMovies=findAllMovies;
movieModel.findMovieById=findMovieById;
movieModel.updateRating=updateRating;
movieModel.addReview=addReview;
movieModel.removeReview=removeReview;

module.exports=movieModel;


function createMovie(movie) {
    //console.log("_____createMovie___MODEL______");
    //console.log(movie);
    //movie._id=movie._tmdbMovieId;
    return movieModel.create(movie);
}

function deleteMovie(movieId) {
    return movieModel.delete({_id:movieId});    
}

function updateMovie(movieId,movie) {
    return movieModel.update({_id:movieId},{$set:movie});
}

function findMovieOnGenre(genre) {
    return movieModel.find({'genre':genre})
        .sort({rating:1})
        .exec();
}

function findAllMovies() {
    return movieModel.find()
        .sort({rating:1})
        .exec();
}

function findMovieById(movieId) {
    return movieModel.findOne({_id:movieId});
}

function updateRating(movieId,rating) {
    return movieModel.find({_id:movieId})
        .then(function (movie) {
           var oldRating=movie.rating;
           //console.log(oldRating);
           //console.log(movie);
        });
}

function addReview(movieId,reviewId) {
    //console.log("____Add Review/ Movie Model____");
    //console.log(movieId);
    return movieModel
        .findOne({tmdbMovieId:movieId})
        .then(function (movie) {
            //console.log(movie);
            movie.reviews.push(reviewId);
            //console.log(movie);
            return movie.save();
        });
}

function removeReview(movieId,reviewId) {
    return movieModel
        .findOne({tmdbMovieId:movieId})
        .then(function (movie) {
            var index=movie.reviews.indexOf(reviewId);
            movie.reviews.splice(index,1);
            return movie.save();
        });
}