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
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/movies/trailers',{
                templateUrl : 'views/movie/trailers/trailers.view.client.html'
            })
            .when('/movies/:movieId',{
                templateUrl :'views/movie/moviePage/movie-page.view.client.html',
                controller  :'moviePageController',
                controllerAs: 'model'
            })
            .when('/movie/search/:title',{
                templateUrl : 'views/movie/moviesearch/movie-search.view.client.html',
                controller  : 'movieSearchController',
                controllerAs: 'model'
            })
            .when('/genre/movies/:genreId/:genrename', {
                templateUrl :'views/movie/moviesearch/movie-search.view.client.html',
                controller  :'movieGenreController',
                controllerAs:'model'
            })
            .when('/cast/:castId',{
                templateUrl :'views/movie/cast/cast.view.client.html',
                controller  :'castPageController',
                controllerAs:'model'
            });



        function checkLoggedIn(userService,$q,$location) {
            var deferred=$q.defer();
            userService
                .loggedin()
                .then(function (user) {
                    if (user==='0') {
                        deferred.reject();
                        $location.url('/login');
                    }
                    else{
                        deferred.resolve(user);
                    }
                });
            return deferred.promise;
        }
        function checkCurrentUser(userService,$q,$location) {
            var deferred=$q.defer();
            userService
                .loggedin()
                .then(function (user) {
                    if (user==='0') {
                        deferred.resolve({});
                        //$location.url('/login');
                    }
                    else{
                        deferred.resolve(user);
                    }
                });
            return deferred.promise;
        }

    }
})();