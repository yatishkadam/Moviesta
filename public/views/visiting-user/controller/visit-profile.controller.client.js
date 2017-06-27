(function () {
    angular
        .module("Moviesta")
        .controller('visitProfileController',visitProfileController);

    function visitProfileController($location,userService,currentUser,DBService,movieDBService,$routeParams) {
        var model = this;
        model.userId =currentUser._id; //$routeParams['userId'];
        model.vUserId=$routeParams.userId;

        // available functions
        model.logout=logout;
        model.searchMovieTMDB=searchMovieTMDB;
        model.getReviewsForUser=getReviewsForUser;
        model.reviewDownVote=reviewDownVote;
        model.reviewUpVote=reviewUpVote;
        model.followUser=followUser;
        model.unFollow=unFollow;
        model.getProfile=getProfile;
        model.getFollowingVisitUser=getFollowingVisitUser;

        //init functions
        function init() {
            renderUser(model.vUserId);
            getReviewsForUser(model.vUserId);
            getFollowers(model.vUserId);
            getFollowing(model.vUserId);
        }
        init();

        function renderUser(userId) {
            userService.findUserById(userId)
                .then(function (user) {
                    model.user=angular.copy(user);
                });
        }
        function getReviewsForUser(userId) {
            DBService.getReviewsForUser(userId)
                .then(function (response) {
                    model.userGivenReviews=angular.copy(response);
                })
        }
        function reviewDownVote(reviewId) {
            //console.log(reviewId);
            movieDBService.reviewDownVote(reviewId,model.user._id)
                .then(function (response) {
                        getReviewsForUser(model.vUserId);
                    },
                    function (response) {
                    });
        }
        function reviewUpVote(reviewId) {
            movieDBService.reviewUpVote(reviewId,model.user._id)
                .then(function(response){
                        getReviewsForUser(model.vUserId);
                    },
                    function (response) {
                    });
        }

        function getFollowers(userId) {
            console.log(userId);
            DBService.getFollowers(userId)
                .then(function (response) {
                    //console.log(response.follower);
                    model.Followers=angular.copy(response.follower);
                    getFollowingVisitUser(model.userId);
                });

        }
        function checkifFollow(userId,arr){
            for (var v in arr){
                if (userId===arr[v]._id){
                    return true;
                }
            }
            return "";
        }
        function getFollowing(userId) {
            DBService.getFollowing(userId)
                .then(function (response) {
                    model.Following=angular.copy(response.following);
                    getFollowingVisitUser(model.userId);
                });
        }
        function getFollowingVisitUser(userId) {
            DBService.getFollowing(userId)
                .then(function (response) {
                    model.isfollow=checkifFollow(model.vUserId,response.following);
                });
        }


        function followUser(){
            DBService.followUser(model.userId,model.vUserId)
                .then(function (response) {
                    init();
                });
        }

        function unFollow() {
            DBService.unFollow(model.vUserId,model.userId)
                .then(function (response) {
                    init();
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url("/login");
                });
        }

        function searchMovieTMDB(title) {
            $location.url("/movie/search/"+title);
        }

        function getProfile(userId) {
            if(userId===model.userId){
                $location.url("/profile");
            }
            else {
                $location.url("/profile/"+userId);
            }
        }
    }

})();