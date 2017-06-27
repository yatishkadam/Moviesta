(function () {
    angular
        .module("Moviesta")
        .service("adminService", adminService);

    function adminService($http) {
        this.getAllUsers=getAllUsers;
        this.getUserByid=getUserByid;
        this.updateProfile=updateProfile;
        this.deleteProfile=deleteProfile;
        this.getAllReviews=getAllReviews;
        this.deleteUserReview=deleteUserReview;



        function deleteUserReview(reviewId) {
            var url ="/api/review/"+reviewId;
            return $http.delete(url)
                .then(function (response) {
                    return response;
                });
        }

        function getAllUsers() {
            var url="/api/getallusers";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateProfile(userId, user) {
            var url = '/api/user/' + userId;
            return $http.put(url, user)
                .then(renderUser);
            //return the user
            function renderUser(response) {
                return response.data;
            }
        }
        //function to delete
        function deleteProfile(userId) {
            var url = '/api/user/' + userId;
            return $http.delete(url)
                .then(function (response) {
                        return response.data;
                    }
                );
        }

        //function to get all review
        function getAllReviews() {
            var url="/api/reviews";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }


        function getUserByid(userId) {
            var url="/api/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }

})();

