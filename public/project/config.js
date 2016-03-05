/**
 * Created by lixie on 16/3/1.
 */

(function(){
    angular
        .module("RecipeApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "./views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/profile_info", {
                    templateUrl: "./views/user/profile_info.view.html",
                    controller: "InfoController"
                })
                .when("/profile_myrecipe", {
                    templateUrl: "./views/user/profile_myrecipe.view.html",
                    controller: "MyRecipeController"
                })
                .when("/profile_reviewed", {
                    templateUrl: "./views/user/profile_reviewed.view.html",
                    controller: "ReviewedController"
                })
                .when("/profile_favorite", {
                    templateUrl: "./views/user/profile_favorite.view.html",
                    controller: "FavoriteController"
                })
                .when("/profile_following", {
                    templateUrl: "./views/user/profile_following.view.html",
                    controller: "FollowingController"
                })
                .when("/register", {
                    templateUrl: "./views/user/register.view.html",
                    controller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: "./views/user/login.view.html",
                    controller: "LoginController"
                })
                .when("/recipe", {
                    templateUrl: "./views/recipe/recipe.view.html",
                    controller: "RecipeController"
                })
                .when("/local_search", {
                    templateUrl: "./views/home/local_search.view.html",
                    controller: "LocalSearchController"
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