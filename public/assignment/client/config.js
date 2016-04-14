/**
 * Created by lixie on 16/2/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/register", {
                    templateUrl: "./views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
                .when("/login", {
                    templateUrl: "./views/users/login.view.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
                .when("/profile", {
                    templateUrl: "./views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .when("/admin", {
                    templateUrl: "./views/admin/admin.view.html",
                    controller: "AdminController",
                    controllerAs: "model",
                    resolve: {
                        checkAdmin: checkAdmin
                    }
                })
                .when("/home", {
                    templateUrl: "./views/home/home.view.html",
                    controller: "HomeController",
                    controllerAs: "model",
                    resolve: {
                        checkCurrentUser: checkCurrentUser
                    }
                })
                .when("/forms", {
                    templateUrl: "./views/forms/forms.view.html",
                    controller: "FormController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }

                })
                .when("/form/:formId/fields", {
                    templateUrl: "./views/forms/field.view.html",
                    controller: "FieldController",
                    controllerAs: "model",
                    resolve: {
                        checkLoggedIn: checkLoggedIn
                    }
                })
                .otherwise({
                    redirectTo: "/home"
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
                    UserService.setCurrentUser(user);
                    deferred.resolve();
                }
                // User is Not Authenticated
                else
                {
                    $rootScope.errorMessage = 'You need to log in.';
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

    /*
    function getLoggedIn(UserService, $q) {

        var deferred = $q.defer();

        if (UserService.isLoggedIn()) {
            deferred.resolve();
        }


        UserService.getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });


        return deferred.promise;
    }
    */

    /*
    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        if (UserService.isLoggedIn()) {
            deferred.resolve();
        } else {
            deferred.reject();
            $location.url("/home");
        }

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }
    */

})();