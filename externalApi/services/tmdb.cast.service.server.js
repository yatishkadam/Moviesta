var app=require('../../express');

var http=require('http');
//https://api.themoviedb.org/3/person/90633?api_key=10721ee699677de0513ac45f7b2da68a&language=en-US


app.get("/api/cast/details/:castId",getCastDetails);
app.get("/api/cast/relatedmovies/:castId",getCastMovies);
app.get("/api/cast/images/:castId",getCastImages);
app.get("/api/cast/socialmedia/:castId",getCastSocialMedia);

var TMDBKey = process.env.TMDBKey;
var baseUrl = "api.themoviedb.org";
var path = "/3/SEARCH_PARAM?api_key=API_KEY&language=en";

var castdetails="person/PERSONID";
var relatedmovies="person/PERSONID/movie_credits";
var castphotos="person/PERSONID/images";
var castsocialmedia="person/PERSONID/external_ids";

function getCastDetails(req,res) {
    var castId=req.params.castId;
    var Title = req.params.movie;
    var options ={
        host:baseUrl,
        path:path
            .replace("SEARCH_PARAM",castdetails)
            .replace("PERSONID",castId)
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

function getCastMovies(req,res) {
    var castId = req.params.castId;
    var options={
        host:baseUrl,
        path:path
            .replace("SEARCH_PARAM",relatedmovies)
            .replace("PERSONID",castId)
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

//get cast images
function getCastImages(req,res) {
    var castId = req.params.castId;
    var options={
        host:baseUrl,
        path:path
            .replace("SEARCH_PARAM",castphotos)
            .replace("PERSONID",castId)
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


//get cast social media
function getCastSocialMedia(req,res) {
    var castId = req.params.castId;
    var options={
        host:baseUrl,
        path:path
            .replace("SEARCH_PARAM",castsocialmedia)
            .replace("PERSONID",castId)
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