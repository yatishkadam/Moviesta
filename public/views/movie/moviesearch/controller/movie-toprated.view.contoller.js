(function(){
    angular
        .module("Moviesta")
        .controller('topRatedController',topRatedController);

    function topRatedController($location,movieService,$routeParams,currentUser,userService) {
        var model =this;
        model.user=currentUser;
        model.toprated=toprated;
        model.searchMovieTMDB=searchMovieTMDB;
        model.getMoviesForGenre=getMoviesForGenre;
        model.logout=logout;

        function init() {
            model.title= 'Top Rated';
            toprated();
        }
        init();

        function toprated() {
            movieService.getTopRatedMovies()
                .then(found,error);
            function found(response) {
                //console.log(response);
                //console.log(response.results);
                model.TMDBmovies = response;
            }
            function error(response) {
                //console.log(response);
            }
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