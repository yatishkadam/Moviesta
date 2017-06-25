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
                  model.TMDBRelatedMovies=angular.copy(response);
              });

      }

      function getMovieDetailsIMDB(movieId) {
          movieService.getDetailsIMDB(movieId)
              .then(function (response) {
                  model.IMDBMovie=angular.copy(response);
                  getCast(model.movieId);
                  //console.log(model.IMDBMovie);
                  return;
              });
      }

      function getCast(movieId) {
          movieService.getCast(movieId)
              .then(function (response) {
                  //console.log(response);
                  model.Casts=angular.copy(response.cast);
              });

      }

      function getCriticReviews(movieId) {
          movieService.getCriticReviews(movieId)
              .then(function (response) {
                  //console.log(response.results);
                  model.reviews=response.results;
              });
       }
       function getMoviesForGenre(genreId) {
           $location("/genre/movies/"+genreId);
       }

       function searchMovieTMDB(title) {
           $location.url("/movie/search/"+title);
       }

   }


})();