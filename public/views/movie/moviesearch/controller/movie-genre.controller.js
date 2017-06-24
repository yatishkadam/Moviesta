(function(){
    angular
        .module("Moviesta")
        .controller('movieGenreController',movieGenreController);

    function movieGenreController($location,movieService,$routeParams) {
        var model =this;
        model.findGenreTMDB=findGenreTMDB;
        model.getMoviesForGenre=getMoviesForGenre;
        model.searchMovieTMDB=searchMovieTMDB;
        function init() {
            model.genre = $routeParams['genreId'];
            model.title = $routeParams['genrename'];
            findGenreTMDB(model.genre);

        }
        init();

        function findGenreTMDB(genre) {
            //console.log(genre);
                movieService.findGenreTMDB(genre)
                    .then(found,err);
                function found(response) {
                    //console.log(response);
                    //console.log(response.results);
                    model.TMDBmovies = response;
                }
                function err(response) {
                    console.log(response);
            }
        }

        function getMoviesForGenre(genreId) {
            $location("/genre/movies/"+genreId);
        }

        function searchMovieTMDB(title) {
            $location.url("/movie/search/"+title);
        }
    }

})();