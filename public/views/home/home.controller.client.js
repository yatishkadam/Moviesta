(function () {
    angular
        .module("Moviesta")
        .controller("homeController",homeController);
    function homeController() {
        var model=this;
        model.slide=slide;
        function init() {
            $('#myCarousel').carousel({
                interval: 3500
            });

        }init();

        function slide(dir) {
            $('#myCarousel').carousel(dir);
        }

    }
})();