(function () {
    angular
        .module("Moviesta")
        .controller("homeController",homeController);
    function homeController($location,movieService) {
        var model=this;
        model.slide=slide;
        model.searchMovieTMDB=searchMovieTMDB;
        model.getNewMovies=getNewMovies;
        function init() {
            $('#myCarousel').carousel({
                interval: 3500
            });

            getNewMovies();

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
                        //console.log(response);
                        //console.log(response.results);
                        model.TMDBmovies = response;
                    
                });
        }

    }
})();