(function () {
    angular
        .module("Moviesta")
        .controller('profileController',profileController);

    function profileController($location,$routeParams,userService,currentUser,$timeout) {
        var model = this;
        model.userid =currentUser._id; //$routeParams['userId'];
        model.updateUser=updateUser;
        model.unregister=deleteUser;
        model.logout=logout;
        model.searchMovieTMDB=searchMovieTMDB;
        function init() {
            renderUser(currentUser);
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
    }

})();