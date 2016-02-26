/**
 * Created by lixie on 16/2/16.
 */

(function()
{
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($rootScope, $scope, $location)
    {
        $scope.$location = $location;
        $rootScope.currUser = {"_id":0, "firstName":"", "lastName":"", "username":"", "password":"", "roles":[], "email":""};
    }
})();

