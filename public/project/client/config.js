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
                    controllerAs: "model",
                    resolve: {
                        checkCurrentUser: checkCurrentUser
                    }
                })
                .when("/home/:searchStr", {
                    templateUrl: "./views/home/home.view.html",
                    controller: "HomeController",
                    controllerAs: "model",
                    resolve: {
                        checkCurrentUser: checkCurrentUser
                    }
                })
                .when("/profile_public/:userId", {
                    templateUrl: "./views/user/profile_public.view.html",
                    controller: "PublicController",
                    controllerAs: "model",
                    resolve: {
                        checkCurrentUser: checkCurrentUser
                    }
                })
                .when("/profile_info", {
                    templateUrl: "./views/user/profile_info.view.html",
                    controller: "InfoController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when("/profile_myrecipe", {
                    templateUrl: "./views/user/profile_myrecipe.view.html",
                    controller: "MyRecipeController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when("/profile_reviewed", {
                    templateUrl: "./views/user/profile_reviewed.view.html",
                    controller: "ReviewedController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when("/profile_favorite", {
                    templateUrl: "./views/user/profile_favorite.view.html",
                    controller: "FavoriteController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when("/profile_following", {
                    templateUrl: "./views/user/profile_following.view.html",
                    controller: "FollowingController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when("/admin_user", {
                    templateUrl: "./views/admin/admin_user.view.html",
                    controller: "AdminUserController",
                    controllerAs: "model",
                    resolve: {
                        checkAdmin: checkAdmin
                    }
                })
                .when("/admin_recipe", {
                    templateUrl: "./views/admin/admin_recipe.view.html",
                    controller: "AdminRecipeController",
                    controllerAs: "model",
                    resolve: {
                        checkAdmin: checkAdmin
                    }
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
                    controllerAs: "model",
                    resolve: {
                        checkCurrentUser: checkCurrentUser
                    }
                })
                .when("/recipe_edit", {
                    templateUrl: "./views/recipe/recipe_edit.view.html",
                    controller: "EditController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when("/recipe_edit/:recipeId", {
                    templateUrl: "./views/recipe/recipe_edit.view.html",
                    controller: "EditController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when("/search", {
                    templateUrl: "./views/search/search.view.html",
                    controller: "SearchController",
                    controllerAs: "model",
                    resolve: {
                        checkCurrentUser: checkCurrentUser
                    }
                })
                .when("/search/:key", {
                    templateUrl: "./views/search/search.view.html",
                    controller: "SearchController",
                    controllerAs: "model",
                    resolve: {
                        checkCurrentUser: checkCurrentUser
                    }
                })
                .when("/detail/:id", {
                    templateUrl: "./views/search/detail.view.html",
                    controller: "DetailController",
                    controllerAs: "model",
                    resolve: {
                        checkCurrentUser: checkCurrentUser
                    }
                })
                .otherwise({
                    redirectTo: "/home"
                });
        })
        .config(function(uiGmapGoogleMapApiProvider) {
            uiGmapGoogleMapApiProvider.configure({
                //    key: 'your api key',
                v: '3.20', //defaults to latest 3.X anyhow
                libraries: 'weather,geometry,visualization'
            });
        });

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope, UserService)
    {
        var deferred = $q.defer();

        UserService
            .loggedin()
            .success(function(user){
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0' && user.roles.indexOf('admin') != -1)
                {
                    UserService.setCurrentUser(user);
                    deferred.resolve();
                }
            });

        return deferred.promise;
    };


    var checkLoggedIn = function($q, $timeout, $http, $location, $rootScope, UserService)
    {
        var deferred = $q.defer();

        UserService
            .loggedin()
            .success(function(user){
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0')
                {
                    //console.log("pass login check");
                    //console.log(user);
                    UserService.setCurrentUser(user);
                    deferred.resolve();
                }
                // User is Not Authenticated
                else
                {
                    $rootScope.errorMessage = 'You need to log in.';
                    alert("need log in");
                    deferred.reject();
                    $location.url('/login');
                }
            });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope, UserService)
    {
        var deferred = $q.defer();

        UserService
            .loggedin()
            .success(function(user){
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0') {
                    UserService.setCurrentUser(user);
                }
                deferred.resolve();
            });

        return deferred.promise;
    };

})();

