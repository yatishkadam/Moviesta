(function () {
    angular
        .module("Moviesta")
        .config(configuration);


    function configuration($routeProvider) {
        $routeProvider
            .when('/',{
            templateUrl : 'home.html'
        });



    }
})();