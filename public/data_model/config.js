/**
 * Created by lixie on 16/2/16.
 */

(function(){
    angular
        .module("DataModelApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "./views/home/home.view.html",
                    controller: "UserController"
                })
                .when("/user", {
                    templateUrl: "./views/user/user.view.html",
                    controller: "UserController"
                })
                .when("/recipe", {
                    templateUrl: "./views/recipe/recipe.view.html",
                    controller: "RecipeController"
                })
                .when("/comment", {
                    templateUrl: "./views/comment/comment.view.html",
                    controller: "CommentController"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();