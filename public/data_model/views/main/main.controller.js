/**
 * Created by lixie on 16/2/16.
 */

(function()
{
    angular
        .module("DataModelApp")
        .controller("MainController", MainController);

    function MainController($rootScope, $scope, $location)
    {
        $scope.$location = $location;
        $rootScope.currUser = {"_id":0, "firstName":"", "lastName":"", "username":"",
            "password":"", "email":"", "birthday":"", "roles":["user", "admin"]};
        $rootScope.currRecipe = {"_id":0, "userId":0, "title":"", "tag1":"", "tag2":"", "tag3":"",
            "ingredientSpirit":"", "ingredientOther":"", "step":"", "user":"", "comment":[]};

    }
})();

