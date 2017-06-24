(function(){
   angular
       .module("Moviesta")
       .controller('moviePageController',moviePageController);

   function moviePageController($location,movieService) {
      var model =this;
      model.findMovieTMDB=findMovieTMDB;




      function findMovieTMDB(title) {
          movieService.findMovieTMDB(title)
              .then(found,error);
          function found(response) {
              model.TMDBmovies = angular.copy(reponse);
          }
      }
   }


});