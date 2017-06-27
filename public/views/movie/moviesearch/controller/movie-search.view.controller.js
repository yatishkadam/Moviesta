(function(){
    angular
        .module("Moviesta")
        .controller('movieSearchController',movieSearchController);

    function movieSearchController($location,movieService,$routeParams,currentUser,userService) {
        var model =this;
        model.user=currentUser;


        model.findMovieTMDB=findMovieTMDB;
        model.searchMovieTMDB=searchMovieTMDB;
        model.logout=logout;

        function init() {
            model.title= $routeParams['title'];
            findMovieTMDB(model.title);
        }
        init();

        function findMovieTMDB(title) {
            movieService.findMovieTMDB(title)
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