(function () {
    angular
        .module("Moviesta")
        .controller('loginController',loginController);

    function loginController($location,userService) {
        var model =this;
        model.login=login;
            function login(user) {
                if (validate(user)) {
                    if (user) {
                        userService
                            .login(user.username,user.password)
                            .then(function (response) {
                                if(response===""){
                                    model.message = "Wrong username or password.";
                                }
                                else {
                                    $location.url("/profile");
                                }
                            }, function (err) {
                                model.message = "Wrong username or password.";
                            });
                    }
                } else {
                    model.message = "Please check details and try again";
                }
            }
            function validate(user) {
                var flag = true;

                if (user) {
                    flag = flag && user.username;
                    flag = flag && user.password;
                } else {
                    flag = false;
                }

                return flag;
            }
        }

})();