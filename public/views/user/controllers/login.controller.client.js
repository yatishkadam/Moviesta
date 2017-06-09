(function () {
    angular
        .module("WAM")
        .controller('loginController',loginController);

    function loginController($location,userService) {
        var model =this;
        model.login=login;

        function login(username,password) {
            userService
                .findUserByCredentials(username,password)
                .then(validLogin,error);


            //if the user is valid
            function validLogin(found) {
                if (found !== null) {
                    $location.url("/user/" + found._id);
                }
            }
            //if the user is not valid
            function error() {
                model.message="sorry "+username+" not found";
            }
        }
    }
})();