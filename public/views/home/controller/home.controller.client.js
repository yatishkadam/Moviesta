(function () {
    angular
        .module("Moviesta")
        .controller("homeController",homeController);
    function homeController($location,movieService,currentUser,userService) {
        var model=this;
        model.user=currentUser;

        model.logout=logout;
        model.searchMovieTMDB=searchMovieTMDB;
        model.getNewMovies=getNewMovies;

        function init() {
            $('#myCarousel').carousel({
                interval: 3500
            });

            getNewMovies();
            getUpcomingMovies();

        }init();

        function slide(dir) {
            $('#myCarousel').carousel(dir);
        }

        function searchMovieTMDB(title) {
            $location.url("/movie/search/"+title);
        }

        function getNewMovies(){
            movieService.getNewMovies()
                .then(function (response) {
                        model.TMDBmovies = response;

                });
        }

        function getUpcomingMovies() {
            movieService.getUpcomingMovies()
                .then(function (response) {
                    model.TMDBmoviesUpcoming=response;
                });
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