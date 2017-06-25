(function () {
    angular
        .module("Moviesta")
        .controller("castPageController",castPageController);

    function castPageController($location,$routeParams,castService) {
        var model= this;
        model.getcastDetails=getcastDetails;
        model.getCastRelatedMovie=getCastRelatedMovie;
        model.getMoviesForGenre=getMoviesForGenre;
        model.searchMovieTMDB=searchMovieTMDB;

        model.castId=$routeParams.castId;
        function init() {
            getcastDetails(model.castId);
            getCastRelatedMovie(model.castId);
        }
        init();

        function getcastDetails(castId) {
            castService.getCastDetails(castId)
                .then(function (response) {
                    //console.log(response);
                   model.cast=angular.copy(response);
                });
        }


        function getCastRelatedMovie(castId) {
            castService.getCastRelatedMovie(castId)
                .then(function (response) {
                    //console.log(response.cast);
                    model.relatedMovie=angular.copy(response.cast);
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