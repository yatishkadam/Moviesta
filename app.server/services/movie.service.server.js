var app=require('../../express');
var movieModel = require("../models/movie/movie.model.server");


app.get    ("/api/movies",findAllMovies);
app.post   ("/api/movie",createMovie);
app.delete ("/api/delete/:movieId",deleteMovie);
app.put    ("/api/movie/:movieId",updateMovie);
app.get    ("/api/movie/genre/:genre",findMovieOnGenre);
app.get    ("/api/movie/:movieId",findMovieById);
app.get    ("/api/getRating/:movieId",getMovieRating);


function createMovie(req,res) {
    //console.log("____________createMovies_________");
    var movie=req.body;
    console.log(movie);
    movieModel.createMovie(movie)
        .then(function (response) {
            //console.log(response);
            res.sendStatus(200);
        });
}

function deleteMovie(req,res) {
    var movieId=req.params.movieId;
    movieModel.deleteMovie(movieId)
        .then(function (response) {
            res.sendStatus(200);
        });
}

function updateMovie(req,res) {
    var movieId = req.params.movieId;
    var movie = req.body;
    movieModel.updateMovie(movieId, movie)
        .then(function (response) {
            //console.log(response);
            res.json(response);
        });
}
function findMovieById(req,res) {
    var movieId=req.params.movieId;
    movieModel.findMovieById(movieId)
        .then(function (response) {
            res.json(response);
        });
}

function findMovieOnGenre(req,res) {
    var genre=req.params.genre;
    movieModel.findMovieOnGenre(genre)
        .then(function (response) {
           res.json(response);
        });
}

function getMovieRating(req,res) {
    var tmdbId=req.params.movieId;
    movieModel.getMovieRating(tmdbId)
        .then(function (response) {
            //console.log(response);
            res.json(response);
        });
}


function findAllMovies(req,res) {
    //console.log("____________findAllMovies_________");
    movieModel.findAllMovies()
        .then(function (response) {
            //console.log(response);
            res.json(response);
        });
}
