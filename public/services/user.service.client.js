(function(){
    angular.module("Moviesta")
        .service("userService",userService);

    function userService($http) {
        this.register = register;
        this.findUserByUsername = findUserByUsername;
        this.login=login;
        this.logout=logout;
        this.loggedin=loggedin;
        this.deleteUser=deleteUser;
        this.findUserByCredentials=findUserByCredentials;
        this.createUser=createUser;
        this.findUserById=findUserById;
        this.updateUser=updateUser;
        this.checkAdmin=checkAdmin;
        this.passwordUpdate=passwordUpdate;

            //funtion to register user
        function register(user) {
            var url = "/api/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });

        }
        function passwordUpdate(user) {
            var url="/api/updatepassword";
            return $http.put(url,user)
                .then(function (response) {
                    return response.data;
                });
        }

        //find user by username
        function findUserByUsername(username) {
            var url = '/api/user?username=' + username;
            return $http.get(url)
                .then(renderUser);
            //return the user
            function renderUser(response) {
                return response.data;
            }
        }

        //function to login
        function login(username, password) {
            var url = "/api/user/login";
            credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    //console.log(response.data);
                    return response.data;
                },function () {
                    return ""
                });
        }

        //function to tell server to logout
        function logout() {
            var url = "/api/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        //function to get if looged in
        function loggedin() {
            var url = "/api/loggedin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        //function to delete
        function deleteUser(userId) {
            var url = '/api/user/' + userId;
            return $http.delete(url)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        //function to find the user given the user name and the password
        function findUserByCredentials(username, password) {
            var url = '/api/user?username=' + username + "&password=" + password;
            return $http
                .get(url)
                .then(renderUser);
            //return the user
            function renderUser(response) {
                return response.data;
            }
        }

        //create user
        function createUser(newUser) {
            var url = "/api/user";
            return $http.post(url, newUser)
                .then(renderUser);
            //return the created user details
            function renderUser(response) {
                console.log("user service" + response.data);
                return response.data;
            }
        }

        //function to find the user by id
        function findUserById(userId) {
            var url = '/api/user/' + userId;
            return $http.get(url)
                .then(renderUser);
            //return the user
            function renderUser(response) {
                return response.data;
            }
        }

        function updateUser(userId, user) {
            var url = '/api/user/' + userId;
            return $http.put(url, user)
                .then(renderUser);
            //return the user
            function renderUser(response) {
                return response.data;
            }
        }

        function checkAdmin() {
                var url = "/api/checkAdmin";
                return $http.get(url)
                    .then(function (response) {
                        return response.data;
                    });
            }
    }

})();