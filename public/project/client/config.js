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
                    controller: "HomeController",
                    controllerAs: "model"
                })
                .when("/home/:searchStr", {
                    templateUrl: "./views/home/home.view.html",
                    controller: "HomeController",
                    controllerAs: "model"
                })
                .when("/profile_public/:userId", {
                    templateUrl: "./views/user/profile_public.view.html",
                    controller: "PublicController",
                    controllerAs: "model"
                })
                .when("/profile_info", {
                    templateUrl: "./views/user/profile_info.view.html",
                    controller: "InfoController",
                    controllerAs: "model"
                })
                .when("/profile_myrecipe", {
                    templateUrl: "./views/user/profile_myrecipe.view.html",
                    controller: "MyRecipeController",
                    controllerAs: "model"
                })
                .when("/profile_reviewed", {
                    templateUrl: "./views/user/profile_reviewed.view.html",
                    controller: "ReviewedController",
                    controllerAs: "model"
                })
                .when("/profile_favorite", {
                    templateUrl: "./views/user/profile_favorite.view.html",
                    controller: "FavoriteController",
                    controllerAs: "model"
                })
                .when("/profile_following", {
                    templateUrl: "./views/user/profile_following.view.html",
                    controller: "FollowingController",
                    controllerAs: "model"
                })
                .when("/admin_user", {
                    templateUrl: "./views/admin/admin_user.view.html",
                    controller: "AdminUserController",
                    controllerAs: "model"
                })
                .when("/admin_recipe", {
                    templateUrl: "./views/admin/admin_recipe.view.html",
                    controller: "AdminRecipeController",
                    controllerAs: "model"
                })
                .when("/register", {
                    templateUrl: "./views/user/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
                .when("/login", {
                    templateUrl: "./views/user/login.view.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
                .when("/recipe/:recipeId", {
                    templateUrl: "./views/recipe/recipe.view.html",
                    controller: "RecipeController",
                    controllerAs: "model"
                })
                .when("/recipe_edit", {
                    templateUrl: "./views/recipe/recipe_edit.view.html",
                    controller: "EditController",
                    controllerAs: "model"
                })
                .when("/search", {
                    templateUrl: "./views/search/search.view.html",
                    controller: "SearchController",
                    controllerAs: "model"
                })
                .when("/search/:spirit :zipcode", {
                    templateUrl: "./views/search/search.view.html",
                    controller: "SearchController",
                    controllerAs: "model"
                })
                .when("/detail/:id", {
                    templateUrl: "./views/search/detail.view.html",
                    controller: "DetailController",
                    controllerAs: "model"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();