var app=require('../../express');

var http=require('http');


app.get("/api/search/:movie",findMovie);
app.get("/api/popularMovies",getPopularMovies);
app.get("/api/similarMovies/:movieId",getSimilarMovies);
app.get("/api/topMovies",getTopMovies);
app.get("/api/upcomingMovies",getUpcomingMovies);
app.get("/api/movieCredits/:movieId",getMovieCredits);
app.get("/api/movieDetails/:movieId",getMovieDetails);
app.get("/api/movieVideos/:movieId",getMovieVideos);
app.get("/api/movieReviews/:movieId",getMovieReviews);
app.get("/api/currentMovies",getCurrentMovies);
app.get("/api/genrelist",getGenreList);
app.get("/api/genre/:genreId",getMovieGenre);
app.get("/api/movieIMDB/:movieId",getDetailsIMDB);


//api parameters
var TMDBKey = process.env.TMDBKey;
var IMDBKey = process.env.IMDBKEY;
var baseUrl = "api.themoviedb.org";
var path = "/3/SEARCH_PARAM?api_key=API_KEY&language=en";
var IMDBbaseUrl="www.omdbapi.com";
var IMDBPath = "/?apikey=API_KEY&";


var IMDBMovieDetails="i=MOVIEID";
var topMovies = "movie/top_rated";
var popularSearch = "discover/movie";
var popularSort = "&sort_by=popularity.desc";
var popularPage = "&page=PAGE";
var movieSearchByTitle = "search/movie";
var upcomingMovies = "movie/upcoming";
var similarMovies = "movie/MOVIEID/similar";
var genreList = "genre/movie/list";
var movieCredits = "movie/MOVIEID/credits";
var movieDetails = "movie/MOVIEID";
var movieName = "&query=TITLE";
var moviePage = "&page=PAGE";
var movieVideos = "movie/MOVIEID/videos";
var movieReviews = "movie/MOVIEID/reviews";
var genre="genre/GENREID/movies";
var currentMovies = "movie/now_playing";



function getDetailsIMDB(req,res) {
    var movieId=req.params.movieId;
    var options ={
        host:IMDBbaseUrl,
        path:IMDBPath
            .replace("API_KEY",IMDBKey)
        +IMDBMovieDetails.replace("MOVIEID",movieId)

    };
    //console.log(options.path);
    var callback = function (response) {
        var str = '';
        response.on('data', function (data) {
            str += data;
        });
        response.on('end', function () {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(str);
        });
    };
    http.get(options,callback);
}
function findMovie(req,res) {
    var Title = req.params.movie;
    Title=Title.replace(/\s/g,"+");
    var options ={
        host:baseUrl,
        path:path
            .replace("SEARCH_PARAM",movieSearchByTitle)
            .replace("API_KEY",TMDBKey)
            +movieName.replace("TITLE",Title)
    };
    //console.log(options.path);
    var callback = function (response) {
        var str = '';
        response.on('data', function (data) {
            str += data;
        });
        response.on('end', function () {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(str);
        });
    };

    http.get(options,callback);
}



//get popular movies
function getPopularMovies(req,res) {
    var options={
        host:baseUrl,
        path:path
            .replace("SEARCH_PARAM",popularSearch)
            .replace("API_KEY",TMDBKey)
        +popularSort
    };
    var callback = function (response) {
        var str = '';
        response.on('data', function (data) {
            str += data;
        });
        response.on('end', function () {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(str);
        });
    };

    http.get(options,callback);
}

function getSimilarMovies(req,res) {
    var movieId=req.params.movieId;
    var options={
        host:baseUrl,
        path:path
            .replace("SEARCH_PARAM",similarMovies)
            .replace("MOVIEID",movieId)
            .replace("API_KEY",TMDBKey)
    };
    var callback = function (response) {
        var str = '';
        response.on('data', function (data) {
            str += data;
        });
        response.on('end', function () {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(str);
        });
    };

    http.get(options,callback);
}

//get top movies
function getTopMovies(req,res) {
    var options={
        host:baseUrl,
        path:path
            .replace("SEARCH_PARAM",topMovies)
            .replace("API_KEY",TMDBKey)
    };
    var callback = function (response) {
        var str = '';
        response.on('data', function (data) {
            str += data;
        });
        response.on('end', function () {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(str);
        });
    };

    http.get(options,callback);
}


//get upcoming movies
function getUpcomingMovies(req,res) {
    var options={
        host:baseUrl,
        path:path
            .replace("SEARCH_PARAM",upcomingMovies)
            .replace("API_KEY",TMDBKey)
    };
    var callback = function (response) {
        var str = '';
        response.on('data', function (data) {
            str += data;
        });
        response.on('end', function () {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(str);
        });
    };

    http.get(options,callback);
}


// get movie credits cast etc..
function getMovieCredits(req,res) {
    var movieId=req.params.movieId;
    var options={
        host:baseUrl,
        path:path
            .replace("SEARCH_PARAM",movieCredits)
            .replace("MOVIEID",movieId)
            .replace("API_KEY",TMDBKey)

    };
    var callback = function (response) {
        var str = '';
        response.on('data', function (data) {
            str += data;
        });
        response.on('end', function () {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(str);
        });
    };

    http.get(options,callback);
}

//get movie details.. budget runtime etc..
function getMovieDetails(req,res) {
    var movieId=req.params.movieId;
    var options={
        host:baseUrl,
        path:path
            .replace("SEARCH_PARAM",movieDetails)
            .replace("MOVIEID",movieId)
            .replace("API_KEY",TMDBKey)

    };
    var callback = function (response) {
        var str = '';
        response.on('data', function (data) {
            str += data;
        });
        response.on('end', function () {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(str);
        });
    };

    http.get(options,callback);
}


//get trailers realter movies etc..
function getMovieVideos(req,res) {
    var movieId=req.params.movieId;
    var options={
        host:baseUrl,
        path:path
            .replace("SEARCH_PARAM",movieVideos)
            .replace("MOVIEID",movieId)
            .replace("API_KEY",TMDBKey)

    };
    var callback = function (response) {
        var str = '';
        response.on('data', function (data) {
            str += data;
        });
        response.on('end', function () {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(str);
        });
    };

    http.get(options,callback);
}


//get critic reviews..
function getMovieReviews(req,res) {
    var movieId=req.params.movieId;
    var options={
        host:baseUrl,
        path:path
            .replace("SEARCH_PARAM",movieReviews)
            .replace("MOVIEID",movieId)
            .replace("API_KEY",TMDBKey)

    };
    var callback = function (response) {
        var str = '';
        response.on('data', function (data) {
            str += data;
        });
        response.on('end', function () {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(str);
        });
    };

    http.get(options,callback);
}


//get current playing movies
function getCurrentMovies(req,res) {
    var options={
        host:baseUrl,
        path:path
            .replace("SEARCH_PARAM",currentMovies)
            .replace("API_KEY",TMDBKey)

    };
    var callback = function (response) {
        var str = '';
        response.on('data', function (data) {
            str += data;
        });
        response.on('end', function () {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(str);
        });
    };

    http.get(options,callback);
}


//get the genre list
function getGenreList(req,res) {
    var options={
        host:baseUrl,
        path:path
            .replace("SEARCH_PARAM",genreList)
            .replace("API_KEY",TMDBKey)

    };
    //console.log(options.path);
    var callback = function (response) {
        var str = '';
        response.on('data', function (data) {
            str += data;
        });
        response.on('end', function () {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(str);
        });
    };

    http.get(options,callback);
}

//get the genre list
function getMovieGenre(req,res) {
    var genreId=req.params.genreId;
    var options={
        host:baseUrl,
        path:path
            .replace("SEARCH_PARAM",genre)
            .replace("GENREID",genreId)
            .replace("API_KEY",TMDBKey)

    };
    //console.log(options.path);
    var callback = function (response) {
        var str = '';
        response.on('data', function (data) {
            str += data;
        });
        response.on('end', function () {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(str);
        });
    };

    http.get(options,callback);
}
