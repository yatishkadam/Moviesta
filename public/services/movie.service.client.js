(function () {
    angular
        .module("Moviesta")
        .service("movieService",movieService);
    function movieService($http) {
        this.findMovieTMDB=findMovieTMDB;
        this.getgenreTMDB=getgenreTMDB;
        this.findGenreTMDB=findGenreTMDB;
        this.getNewMovies=getNewMovies;

        //find movie from tmdb
        function findMovieTMDB(title) {
            var url="/api/search/"+title;
            return $http.get(url)
                .then(function (response) {
                    var data=response.data;
                    return sendMovieList(data.results);

                });
        }

        //get genre list
        function getgenreTMDB() {
            var url="/api/genrelist";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        //get movies based on genre
        function findGenreTMDB(genreId) {
            var url="/api/genre/"+genreId;
            return $http.get(url)
                .then(function (response) {
                    var data=response.data;
                    return sendMovieList(data.results);
                });
        }

        //function to get new movies
        function getNewMovies() {
            var url='/api/currentMovies';
            return $http.get(url)
                .then(function (response) {
                    var data=response.data;
                    return sendMovieList(data.results);
                });
        }



        //helper funtions
        function sendMovieList(list){
            return getgenreTMDB()
                .then(
                    function (genrelist) {
                        return cleanUp(list,genrelist);
                    }
                )
        }
        function cleanUp(movieList,genrelist) {
            var arrList=[];
            for (var v in movieList){
                //console.log(movieList);
                //console.log(movieList[v]);
                var newMovie={
                    id:movieList[v].id,
                    original_title:movieList[v].original_title,
                    title:movieList[v].title,
                    poster_path:movieList[v].poster_path,
                    genre_ids:getGenreType(movieList[v].genre_ids,genrelist),
                    release_date:movieList[v].release_date,
                    overview:movieList[v].overview,
                    popularity:movieList[v].popularity
                };
                arrList.push(newMovie);
            }
            //console.log(arrList);
            return arrList;

        }

        function getGenreType(list,genrelist){
            //console.log(list);
            var ls=[];
            list.forEach(function (item) {
                //console.log(item);
                //console.log(model.genrelist);
                for (var v in genrelist.genres){
                    //console.log("__________________");
                    //console.log(model.genrelist.genres[v]);
                    if(item===genrelist.genres[v].id){
                        ls.push(genrelist.genres[v]);
                    }
                }
            });
            //console.log(ls);
            return ls;
        }



    }
})();