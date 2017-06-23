(function () {
    angular
        .module("Moviesta")
        .controller('loginController',loginController);

    function loginController($location,userService) {
        var model =this;
        model.login=login;

        function login(username,password) {
            userService
                .login(username,password)
                .then(validLogin,error);


            //if the user is valid
            function validLogin(found) {
                if (found !== null) {
                    $location.url("/profile");
                }
            }
            //if the user is not valid
            function error() {
                model.message="sorry "+username+" not found";
            }
        }
    }
})();