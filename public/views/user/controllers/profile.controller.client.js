(function () {
    angular
        .module("WAM")
        .controller('profileController',profileController);

    function profileController($location,$routeParams,userService) {
        var model = this;
        model.userid = $routeParams['userId'];
        userService
                .findUserById(model.userid)
                .then(renderUser,userError);
        model.updateUser=updateUser;
        model.unregister=deleteUser;


        function renderUser(user) {
            model.user=angular.copy(user);
        }
        function userError(error) {
            model.error="user not found";
        }
        function updateUser(user) {
            userService
                .updateUser(user._id,user)
                .then(sucess,failure);

            function sucess(){
                    model.sucess="updated";
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
                $location.url("/");
            }
            function failure() {
                model.sucess="could not delete profile , please try again";
            }

        }
    }

})();