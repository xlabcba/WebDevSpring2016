/**
 * Created by lixie on 16/3/1.
 */

(function(){
    angular
        .module("RecipeApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "./views/home/home.view.html"
                    //controller: "HomeController"
                })
                .when("/search", {
                    templateUrl: "./views/search/search.view.html",
                    controller: "SearchController"
                })
                .when("/search/:spirit :zipcode", {
                    templateUrl: "./views/search/search.view.html",
                    controller: "SearchController"
                })
                .when("/detail/:id", {
                    templateUrl: "./views/search/detail.view.html",
                    controller: "DetailController"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();