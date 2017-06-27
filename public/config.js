(function () {
    angular
        .module("Moviesta")
        .config(configuration);


    function configuration($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl : 'views/home/home.html',
                controller  : 'homeController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkCurrentUser
                }
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
            .when('/profile/:userId',{
                templateUrl : 'views/visiting-user/visit-profile.view.client.html',
                controller  : 'visitProfileController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/profile',{
                templateUrl : 'views/user/profile.view.client.html',
                controller  : 'profileController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/admin',{
            templateUrl : 'views/user/admin-profile.view.client.html',
            controller  : 'adminprofileController',
            controllerAs: 'model',
            resolve:{
                currentUser:checkAdmin
            }
            })
            .when('/movies/:movieId',{
                templateUrl :'views/movie/moviePage/movie-page.view.client.html',
                controller  :'moviePageController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkCurrentUser
                }
            })
            .when('/movie/search/:title',{
                templateUrl : 'views/movie/moviesearch/movie-search.view.client.html',
                controller  : 'movieSearchController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkCurrentUser
                }
            })
            .when('/TopRated',{
                templateUrl : 'views/movie/moviesearch/movie-search.view.client.html',
                controller  : 'topRatedController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkCurrentUser
                }
            })
            .when('/related/:movieId',{
                templateUrl : 'views/movie/moviesearch/movie-search.view.client.html',
                controller  : 'relatedMovieController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkCurrentUser
                }
            })
            .when('/genre/movies/:genreId/:genrename', {
                templateUrl :'views/movie/moviesearch/movie-search.view.client.html',
                controller  :'movieGenreController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkCurrentUser
                }
            })

            .when('/cast/:castId',{
                templateUrl :'views/movie/cast/cast.view.client.html',
                controller  :'castPageController',
                controllerAs:'model',
                resolve:{
                    currentUser:checkCurrentUser
                }
            });


        //check if logged in
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
        // to make the current user available
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
        // to check if the admin is logged in
        function checkAdmin($q, $location, userService) {
            var deferred = $q.defer();
            userService
                .checkAdmin()
                .then(function (currentUser) {
                    if(currentUser === '0') {
                        deferred.resolve({});
                        $location.url('/');
                    } else {
                        deferred.resolve(currentUser);
                    }
                });
            return deferred.promise;
        }

    }
})();