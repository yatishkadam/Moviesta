(function(){
   angular
       .module("Moviesta")
       .controller('moviePageController',moviePageController);

   function moviePageController($routeParams,$location,$mdDialog,movieService,movieDBService,currentUser,userService) {
      var model =this;
      model.user=currentUser;
      console.log(model.user);
      model.getMoviesForGenre=getMoviesForGenre;
      model.getMovieDetails=getMovieDetails;
      model.searchMovieTMDB=searchMovieTMDB;
      model.getMovieDetailsIMDB=getMovieDetailsIMDB;
      model.getTMDBRelatedMovies=getTMDBRelatedMovies;
      model.getCriticReviews=getCriticReviews;
      model.reviewDownVote=reviewDownVote;
      model.reviewUpVote=reviewUpVote;
      model.logout=logout;
      model.createReview=createReview;
      model.getProfile=getProfile;
      model.checkifCurrentUser=checkifCurrentUser;
      model.movieId=$routeParams.movieId;
      function init() {
          getMovieDetails(model.movieId);
          getTMDBRelatedMovies(model.movieId);
          getCriticReviews(model.movieId);
          getUserReviews(model.movieId);
      }
      init();

      function getMovieDetails(movieId) {
          movieService.getMovieDetails(movieId)
              .then(function (response) {
                  var newMovie={
                      tmdbMovieId:movieId,
                      tmdbName:response.title
                  };
                  movieDBService.createMovie(newMovie)
                      .then(function (response) {
                          //console.log(response);
                      });
                  model.movie=angular.copy(response);
                  getMovieDetailsIMDB(response.imdb_id);
                 //console.log(model.movie);
              });
      }
      function getTMDBRelatedMovies(movieId) {
          movieService.getTMDBRelatedMovies(movieId)
              .then(function (response) {
                  model.TMDBRelatedMovies=angular.copy(response);
              });

      }

      function getMovieDetailsIMDB(movieId) {
          movieService.getDetailsIMDB(movieId)
              .then(function (response) {
                  model.IMDBMovie=angular.copy(response);
                  getCast(model.movieId);
                  //console.log(model.IMDBMovie);
                  return;
              });
      }

      function getCast(movieId) {
          movieService.getCast(movieId)
              .then(function (response) {
                  //console.log(response);
                  model.Casts=angular.copy(response.cast);
              });

      }

      function getCriticReviews(movieId) {
          movieService.getCriticReviews(movieId)
              .then(function (response) {
                  //console.log(response.results);
                  model.reviews=angular.copy(response.results);
              });
       }


       function getUserReviews(movieId) {
           model.criticReviews=[];
           movieDBService.getUserReviews(movieId)
               .then(function (response) {
                   //console.log(response);
                   response.forEach(function (review) {
                      if (review.authorRole==="CRITIC"){
                          model.criticReviews.push(review);
                      }
                   });
                   console.log(model.criticReviews);
                   model.UserReviews=angular.copy(response);
               });
       }
       function reviewDownVote(reviewId) {
          //console.log(reviewId);
           movieDBService.reviewDownVote(reviewId,model.user._id)
               .then(function (response) {
                   getUserReviews(model.movieId);
               },
               function (response) {
                   //console.log(response);
               });
       }
       function reviewUpVote(reviewId) {
           //console.log(reviewId);
           movieDBService.reviewUpVote(reviewId,model.user._id)
               .then(function(response){
                   getUserReviews(model.movieId);
                   },
                   function (response) {
                   //console.log(response);
                   });
       }
       function createReview(review) {
           review.tmdbMovieId=model.movieId;
           review.author=model.user.firstName;
           review._userId=model.user._id;
           review.movieName=model.movie.title;
           if (model.user.roles.indexOf("CRITIC")>-1)
           {
               review.authorRole='CRITIC';
           }
           else
           {
               review.authorRole='USER';
           }
           review._movieId=model.movie._id;
           movieDBService.createReview(review)
               .then(function (response) {
                   model.newReview.content='';
                   getUserReviews(model.movieId);
               });

       }


       function getMoviesForGenre(genreId) {
           $location("/genre/movies/"+genreId);
       }

       function searchMovieTMDB(title) {
           $location.url("/movie/search/"+title);
       }

       function logout() {
           userService
               .logout()
               .then(function () {
                   $location.url("/login");
               });
       }

       function getProfile(userId) {
          //console.log(userId);
          //console.log(model.user._id);
           if(userId===model.user._id){
               $location.url("/profile");
           }
            {
               checkifCurrentUser(userId);
           }
       }

       function checkifCurrentUser(userId){
           userService.findUserById(userId)
               .then(function(response){
                   if (response===null){
                       model.error=true;
                   }
                   else {
                       $location.url("/profile/"+response._id);
                   }
               });

       }
           model.showAlert = function(ev) {
               model.error=false;
               // Appending dialog to document.body to cover sidenav in docs app
               // Modal dialogs should fully cover application
               // to prevent interaction outside of dialog
               $mdDialog.show(
                   $mdDialog.alert()
                       .parent(angular.element(document.querySelector('#popupContainer')))
                       .clickOutsideToClose(true)
                       .title('Sorry!!!')
                       .textContent('user is not registered with us anymore!!!!!')
                       .ariaLabel('Alert Dialog Demo')
                       .ok('Got it!')
                       .targetEvent(ev)
               );
           };

   }


})();