(function () {
    angular
        .module("WAM")
        .controller("registerController",registerController);

    function registerController($location,userService) {
        var model=this;
        model.register=register;

        function register(firstName,lastName,username,email,password,password2) {
            if (typeof username==='undefined'){
                model.error="please enter a username";
                return ;
            }
            if (password!==password2 || password===null || typeof password==='undefined'){
                model.error="password must match";
                return ;
            }
            userService.findUserByUsername(username)
                .then(error,registerUser);

            //when a username already exists
            function error() {
                model.error="username exsists, please try a different username ";
            }

            //register new user
            function registerUser() {
                //initialize new user
                var newUser={
                    username:username,
                    password:password,
                    firstName:firstName,
                    lastName:lastName,
                    email:email
                };

                //to create user
                userService
                    .createUser(newUser)
                    .then(renderUser);
                //change location after create user
                function renderUser(user) {
                    $location.url('/user/'+user._id);
                }
            }
        }
    }

})();