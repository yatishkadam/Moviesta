(function () {
    angular
        .module("Moviesta")
        .controller('adminprofileController',adminprofileController);

    function adminprofileController($location,userService,currentUser,DBService,movieDBService,adminService) {
        var model = this;
        model.user =currentUser; //$routeParams['userId'];
        model.getUserByid=getUserByid;
        model.logout=logout;
        model.updateProfile=updateProfile;
        model.deleteProfile=deleteProfile;
        model.getAllReviews=getAllReviews;
        model.getProfile=getProfile;
        model.getReviewById=getReviewById;
        model.reviewUpdate=reviewUpdate;
        model.reviewDelete=reviewDelete;
        function init() {
            getAllUsers();
            getAllReviews();
        }
        init();

        function getAllUsers(){
            adminService.getAllUsers()
                .then(function (users) {
                   model.allUsers=angular.copy(users);
                });
        }

        function getAllReviews() {
            adminService.getAllReviews()
                .then(function (reviews) {
                    model.allReviews=angular.copy(reviews);
                });
        }

        function getUserByid(userId) {
            //console.log(userId);
            adminService.getUserByid(userId)
                .then(function (user) {
                    console.log(user);
                    model.editUser=angular.copy(user);
                });
        }

        function updateProfile(userId,user) {
            //console.log(userId);
            //console.log(user);
            var role=user.roles.split(",");
            user.roles=role;
            adminService.updateProfile(userId,user)
                .then(function (user) {
                    //console.log(user);
                    init();
                });
        }
        function deleteProfile(userId) {
            console.log(userId);
            adminService.deleteProfile(userId)
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

        function getProfile(userId) {
            console.log(model.user._id);
            console.log(userId);
            if(userId===model.user._id){
                $location.url("/profile");
            }
            else {
                $location.url("/profile/"+userId);
            }
        }
        function getReviewById(reviewId) {
            DBService.getReviewById(reviewId)
                .then(function(response){
                    model.reviewForUpdate=angular.copy(response);
                });
        }
        function reviewUpdate(reviewId,review) {
            DBService.reviewUpdate(reviewId,review)
                .then(function (response) {
                    init();
                });
        }
        function reviewDelete(reviewId) {
            adminService.deleteUserReview(reviewId)
                .then(function (response) {
                    init();
                });
        }

        function searchMovieTMDB(title) {
            $location.url("/movie/search/"+title);
        }
    }

})();