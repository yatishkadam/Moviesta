(function () {
    angular
        .module("Moviesta")
        .controller('visitProfileController',visitProfileController);

    function visitProfileController($location,userService,currentUser,DBService,movieDBService,$routeParams) {
        var model = this;
        model.userId =currentUser._id; //$routeParams['userId'];
        model.vUserId=$routeParams.userId;
        model.logout=logout;
        model.searchMovieTMDB=searchMovieTMDB;
        model.getReviewsForUser=getReviewsForUser;
        model.reviewDownVote=reviewDownVote;
        model.reviewUpVote=reviewUpVote;
        model.followUser=followUser;
        model.unFollow=unFollow;
        model.getProfile=getProfile;


        function init() {
            renderUser(model.vUserId);
            getReviewsForUser(model.vUserId);
            getFollowers(model.vUserId);
            getFollowing(model.vUserId);
        }
        init();
        // userService
        //         .findUserById(model.userid)
        //         .then(renderUser,userError);

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
                        //console.log(response);
                    });
        }
        function reviewUpVote(reviewId) {
            //console.log(reviewId);
            movieDBService.reviewUpVote(reviewId,model.user._id)
                .then(function(response){
                        getReviewsForUser(model.vUserId);
                    },
                    function (response) {
                        //console.log(response);
                    });
        }

        function getFollowers(userId) {
            console.log(userId);
            DBService.getFollowers(userId)
                .then(function (response) {
                    //console.log(response.follower);
                    model.Followers=angular.copy(response.follower);
                    model.isfollow=checkifFollow(model.userId,response.follower);
                });

        }
        function checkifFollow(userId,arr){
            //console.log("___checkIfFollow___");
            //console.log(arr);
            for (var v in arr){
                //console.log(model.Followers);
                if (userId===arr[v]._id){
                    return true;
                }
            }
            return "";
        }
        function getFollowing(userId) {
            //console.log(userId);
            DBService.getFollowing(userId)
                .then(function (response) {
                    //console.log("____is following___");
                    model.Following=angular.copy(response.following);
                    model.isfollow=checkifFollow(model.userId,response.following);
                    //console.log(model.isfollow);
                });
        }


        function followUser(){
            //console.log(model.userId,model.vUserId);
            DBService.followUser(model.userId,model.vUserId)
                .then(function (response) {
                    //console.log(response);
                   getFollowers(model.vUserId);
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