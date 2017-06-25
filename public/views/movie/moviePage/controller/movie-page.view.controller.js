(function(){
   angular
       .module("Moviesta")
       .controller('moviePageController',moviePageController);

   function moviePageController($routeParams,$location,movieService) {
      var model =this;
      model.getMoviesForGenre=getMoviesForGenre;
      model.getMovieDetails=getMovieDetails;
      model.searchMovieTMDB=searchMovieTMDB;
      model.getMovieDetailsIMDB=getMovieDetailsIMDB;
      model.getTMDBRelatedMovies=getTMDBRelatedMovies;
      model.getCriticReviews=getCriticReviews;
      model.movieId=$routeParams.movieId;
      function init() {
          getMovieDetails(model.movieId);
          getTMDBRelatedMovies(model.movieId);
          getCriticReviews(model.movieId);
      }
      init();

      function getMovieDetails(movieId) {
          movieService.getMovieDetails(movieId)
              .then(function (response) {
                  model.movie=angular.copy(response);
                  getMovieDetailsIMDB(response.imdb_id);
                 //console.log(model.movie);
              });
      }
      function getTMDBRelatedMovies(movieId) {
          movieService.getTMDBRelatedMovies(movieId)
              .then(function (response) {
                  var cast =[];
                  var i =0;
                  while(i<5){
                      cast.push(response[i]);
                      i++;
                  }
                  model.TMDBRelatedMovies=angular.copy(cast);
              });

      }

      function getMovieDetailsIMDB(movieId) {
          movieService.getDetailsIMDB(movieId)
              .then(function (response) {
                  model.IMDBMovie=angular.copy(response);
                  getCast(model.movieId,model.IMDBMovie.Actors);
                  //console.log(model.IMDBMovie);
                  return;
              });
      }

      function getCast(movieId,IMDBcast) {
          movieService.getCast(movieId)
              .then(function (response) {
                  //console.log(response.cast);
                  IMDBcast=IMDBcast.split(", ");
                  //console.log(IMDBcast);
                  makeCastList(response.cast);
              });

      }

      function getCriticReviews(movieId) {
          movieService.getCriticReviews(movieId)
              .then(function (response) {
                  //console.log(response.results);
                  model.reviews=response.results;
              });
       }
       function makeCastList(castTMDB) {
          var cast =[];
          var i =0;
          while(i<10){
              cast.push(castTMDB[i]);
              i++;
          }
           //console.log(cast);
           model.Casts=angular.copy(cast);
       }



       function getMoviesForGenre(genreId) {
           $location("/genre/movies/"+genreId);
       }

       function searchMovieTMDB(title) {
           $location.url("/movie/search/"+title);
       }

   }


})();