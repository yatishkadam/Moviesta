(function () {
    angular
        .module("Moviesta")
        .controller('profileController',profileController);

    function profileController($location,userService,currentUser,DBService,movieDBService,adminService) {
        var model = this;
        model.user=currentUser;
        model.userId =currentUser._id; //$routeParams['userId'];
        model.updateUser=updateUser;
        model.unregister=deleteUser;
        model.logout=logout;
        model.searchMovieTMDB=searchMovieTMDB;
        model.getReviewsForUser=getReviewsForUser;
        model.reviewDelete=reviewDelete;
        model.reviewDownVote=reviewDownVote;
        model.reviewUpVote=reviewUpVote;
        model.getReviewById=getReviewById;
        model.reviewUpdate=reviewUpdate;
        model.getFollowing=getFollowing;
        model.getFollowers=getFollowers;
        model.unFollow=unFollow;
        model.getAllReviews=getAllReviews;

        function init() {
            renderUser(currentUser);
            getReviewsForUser(model.userId);
            getFollowers(model.userId);
            getFollowing(model.userId);
            getAllReviews();
        }
        init();
        // userService
        //         .findUserById(model.userid)
        //         .then(renderUser,userError);

        function renderUser(user) {
            model.user=angular.copy(user);
        }
        // function userError(error) {
        //     model.error="user not found";
        // }
        function updateUser(user) {
            userService
                .updateUser(user._id,user)
                .then(sucess,failure);

            function sucess(){
                model.sucess="updated";
                $location.url("/profile");
            }
            function failure(){
                model.sucess="opps!! something went wrong";
            }
        }

        function deleteUser(userId){
            userService
                .deleteUser(userId)
                .then(sucess,failure);

            function sucess(){
                $location.url("/login");
            }
            function failure() {
                model.sucess="could not delete profile , please try again";
            }

        }
        function getReviewsForUser(userId) {
            DBService.getReviewsForUser(userId)
                .then(function (response) {
                    model.userGivenReviews=angular.copy(response);
                })
        }

        function getReviewById(reviewId) {
            DBService.getReviewById(reviewId)
                .then(function(response){
                    model.reviewForUpdate=angular.copy(response);
                });
        }

        function reviewDelete(reviewId) {
            DBService.deleteReview(reviewId)
                .then(function (response) {
                    getReviewsForUser(model.userId);
                });
        }

        function reviewUpdate(reviewId,review) {
            DBService.reviewUpdate(reviewId,review)
                .then(function (response) {
                    getReviewsForUser(model.userId);
                });
        }
        function reviewDownVote(reviewId) {
            //console.log(reviewId);
            movieDBService.reviewDownVote(reviewId,model.user._id)
                .then(function (response) {
                        getReviewsForUser(model.userId);
                        getAllReviews();
                    },
                    function (response) {
                        //console.log(response);
                    });
        }
        function reviewUpVote(reviewId) {
            //console.log(reviewId);
            movieDBService.reviewUpVote(reviewId,model.user._id)
                .then(function(response){
                        getReviewsForUser(model.userId);
                        getAllReviews();
                    },
                    function (response) {
                        //console.log(response);
                    });
        }

        function getFollowers(userId) {
            DBService.getFollowers(userId)
                .then(function (response) {
                    console.log(response.follower);
                   model.Followers=angular.copy(response.follower);

                });

        }
        function getFollowing(userId) {
            DBService.getFollowing(userId)
                .then(function (response) {
                    model.Following=angular.copy(response.following);
                    });
        }

        function unFollow(followingId) {
            DBService.unFollow(followingId,model.userId)
                .then(function (response) {
                    getFollowing(model.userId);
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url("/login");
                });
        }

        function getAllReviews() {
            adminService.getAllReviews()
                .then(function (reviews) {
                    model.allReviews=angular.copy(reviews);
                });
        }

        function searchMovieTMDB(title) {
            $location.url("/movie/search/"+title);
        }
    }

})();