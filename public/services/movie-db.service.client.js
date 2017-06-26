(function () {
    angular
        .module("Moviesta")
        .service("movieDBService", movieDBService);
    function movieDBService($http) {
        this.createMovie=createMovie;
        this.getUserReviews=getUserReviews;
        this.reviewUpVote=reviewUpVote;
        this.reviewDownVote=reviewDownVote;
        this.createReview=createReview;
        //this.updateReview=updateReview;

        function createMovie(newMovie) {
            var url="/api/movie";
            return $http.post(url, newMovie)
                .then(function (response) {
                    return response.data;
                });
        }
        function getUserReviews(movieId) {
            var url="/api/getReviewByMovieId/"+movieId;
            return $http.get(url)
                .then(function (response) {
                   return response.data;
                });
        }

        function reviewUpVote(reviewId,userId) {
            //console.log(userId);
            var url="/api/"+userId+"/review/upvote/"+reviewId;
            return $http.put(url)
                .then(function (response) {
                    //console.log("__________movieDB SERVICE_____");
                    //console.log(response);
                    return response.data;
                });
        }
        function reviewDownVote(reviewId,userId) {
            //onsole.log(userId);
            var url="/api/"+userId+"/review/downvote/"+reviewId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createReview(review){
            var url="/api/review";
            return $http.post(url,review)
                .then(function (response) {
                    return response.data;
                });
        }

    }

})();