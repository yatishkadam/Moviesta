(function () {
    angular
        .module("Moviesta")
        .controller("castPageController",castPageController);

    function castPageController($location,$routeParams,castService,currentUser,userService) {
        var model= this;
        model.user=currentUser;
        model.getcastDetails=getcastDetails;
        model.getCastRelatedMovie=getCastRelatedMovie;
        model.getMoviesForGenre=getMoviesForGenre;
        model.searchMovieTMDB=searchMovieTMDB;
        model.logout=logout;

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

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url("/login");
                });
        }
    }
})();