(function () {
    angular
        .module("Moviesta")
        .config(configuration);


    function configuration($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl : 'views/home/home.html',
                controller  : 'homeController',
                controllerAs: 'model'
            })
            .when('/login',{
                templateUrl : 'views/user/login.view.client.html',
                controller  : 'loginController',
                controllerAs: 'model'
            })
            .when('/register',{
            templateUrl : 'views/user/register.view.client.html',
            controller  : 'registerController',
            controllerAs: 'model'
            })
            .when('/profile',{
            templateUrl : 'views/user/profile.view.client.html',
            controller  : 'profileController',
            controllerAs: 'model'
            });



    }
})();