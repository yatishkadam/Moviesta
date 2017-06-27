(function () {
    angular
        .module("Moviesta")
        .controller('adminprofileController',adminprofileController);

    function adminprofileController($location,$mdDialog,userService,currentUser,DBService,movieDBService,adminService) {
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
        model.getAllFollow=getAllFollow;
        model.deleteFollow=deleteFollow;
        function init() {
            getAllUsers();
            getAllReviews();
            getAllFollow();
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
                    //console.log(user);
                    model.editUser=angular.copy(user);
                });
        }

        function updateProfile(userId,user) {
            if (typeof user.roles==="object"){
                console.log();
            }
            else
            {
                var r=[];
                var role=user.roles.split(",");
                role.forEach(function (item) {
                    if (item.toUpperCase()==="ADMIN"||item.toUpperCase()==="USER"||item.toUpperCase()==="CRITIC"){
                        r.push(item.toUpperCase());
                    }
                });
                user.roles=r;
            }
            adminService.updateProfile(userId,user)
                .then(function (user) {
                    //console.log(user);
                    init();
                });
        }
        function deleteProfile(userId) {
            //console.log(userId);
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
            //console.log(userId);
            //console.log(model.user._id);
            if(userId==model.user._id){
                $location.url("/profile");
            }
            else {
                checkifCurrentUser(userId);
            }
        }

        function checkifCurrentUser(userId){
            userService.findUserById(userId)
                .then(function(response){
                    if (response===null){
                        model.error=true;
                    }
                    else {
                        $location.url("/profile/"+response._id);
                    }
                });

        }
        model.showAlert = function(ev) {
            model.error=false;
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Sorry!!!')
                    .textContent('user is not registered with us anymore!!!!!' +
                        '  go ahead and delete the Review')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                    .targetEvent(ev)
            );
        };
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

        function getAllFollow() {
            //console.log("__getAllFollows__");
         adminService.getAllFollows()
             .then(function (follows) {
                 model.follows=angular.copy(follows);
             //console.log(follows);

         });
        }
        function deleteFollow(followId) {
            adminService.deleteFollow(followId)
                .then(function () {
                   init();
                });
        }

        function searchMovieTMDB(title) {
            $location.url("/movie/search/"+title);
        }
    }

})();