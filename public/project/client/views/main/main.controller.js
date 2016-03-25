/**
 * Created by lixie on 16/3/4.
 */

(function()
{
    angular
        .module("RecipeApp")
        .controller("MainController", MainController);

    function MainController($rootScope, $scope, $location)
    {
        $scope.$location = $location;
        $rootScope.currUser = {"_id":0, "firstName":"", "lastName":"", "username":"", "password":"", "roles":[], "email":""};
    }
})();