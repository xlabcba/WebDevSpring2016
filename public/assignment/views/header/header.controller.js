/**
 * Created by lixie on 16/2/15.
 */

(function()
{
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $scope)
    {
        $scope.isLogin = function() {
            return $rootScope.currUser._id !== 0;
        }
        $scope.resetUser = function() {
            $rootScope.currUser = {"_id":0, "firstName":"", "lastName":"", "username":"", "password":"", "roles":[]};
        }
    }

})();