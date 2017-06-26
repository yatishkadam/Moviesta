(function(){
    angular
        .module("Moviesta")
        .controller('relatedMovieController',relatedMovieController);

    function relatedMovieController($location,movieService,$routeParams,currentUser,userService) {
        var model = this;
        model.user=currentUser;
        model.getMoviesForGenre=getMoviesForGenre;
        model.searchMovieTMDB=searchMovieTMDB;
        model.getTMDBRelatedMovies=getTMDBRelatedMovies;
        model.logout=logout;
        function init() {
            model.title = "Related Movies";
            model.movieId = $routeParams['movieId'];
            getTMDBRelatedMovies(model.movieId);

        }
        init();
        function getTMDBRelatedMovies(movieId) {
            movieService.getTMDBRelatedMovies(movieId)
                .then(function (response) {
                    model.TMDBmovies=angular.copy(response);
                });

        }
        function getMoviesForGenre(genreId) {
            $location("/genre/movies/"+genreId);
        }

        function searchMovieTMDB(title) {
            $location.url("/movie/search/"+title);
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url("/login");
                });
        }
    }

})();