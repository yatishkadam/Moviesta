(function () {
    angular
        .module("Moviesta")
        .service("DBService",DBService);
    function DBService($http) {

        this.getReviewsForUser=getReviewsForUser;
        this.deleteReview=deleteReview;
        this.getReviewById=getReviewById;
        this.reviewUpdate=reviewUpdate;
        this.getFollowers=getFollowers;
        this.followUser=followUser;
        this.getFollowing=getFollowing;
        this.unFollow=unFollow;

        function unFollow(follower,following) {
            var url ="/api/unfollow/"+follower+"/"+following;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getReviewsForUser(userId) {
            var url="/api/getReviewByUserId/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        function deleteReview(reviewId) {
            var url ="/api/review/"+reviewId;
            return $http.delete(url)
                .then(function (response) {
                    return response;
                });
        }

        function getReviewById(reviewId) {
            var url="/api/review/"+reviewId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function reviewUpdate(reviewId,review) {
            var url="/api/review/"+reviewId;
            return $http.put(url,review)
                .then(function (response) {
                    return response.data;
                });
        }
        function getFollowers(userId) {
            //console.log(userId);
            var url="/api/Follower/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return makeArrayFollowers(response.data);
                });
        }

        function followUser(followerId,followingId) {
            //console.log(followerId,followingId);
            var url="/api/createFollow/"+followerId+"/"+followingId;
            return $http.put(url)
                .then(function (response) {
                   return response;
                });
        }

        function getFollowing(userId) {
            //console.log(userId);
            var url="/api/getFollowing/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return makeArrayFollowers(response.data);
                });
        }

        function makeArrayFollowers(follow) {
            var followers=[];
            var following=[];
            follow.forEach(function (item) {
                followers.push(item.follower);
                following.push(item.following);
            });
            var follow1={
                follower:followers,
                following:following
            };
            return (follow1);
        }

    }
})();
