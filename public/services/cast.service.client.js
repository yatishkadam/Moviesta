(function () {
    angular
        .module("Moviesta")
        .service("castService", castService);


    function castService($http) {
        this.getCastDetails = getCastDetails;
        this.getCastRelatedMovie=getCastRelatedMovie;


        function getCastDetails(castId) {
            var url="/api/cast/details/"+castId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function getCastRelatedMovie(castId) {
            var url="/api/cast/relatedmovies/"+castId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }



    }
})();