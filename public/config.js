(function () {
    angular
        .module("Moviesta")
        .config(configuration);


    function configuration($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl : 'views/home/home.html',
                controller:'homeController',
                controllerAs:'model'
            });



    }
})();