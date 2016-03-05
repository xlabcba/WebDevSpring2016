/**
 * Created by lixie on 16/2/15.
 */

(function()
{
    angular
        .module("DataModelApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($rootScope, $scope)
    {
        $scope.isLogin = function() {
            return $rootScope.currUser._id !== 0;
        }
        $scope.isAdmin = function() {
            var currUser = $rootScope.currUser;
            for(var i=0; i<currUser.roles.length; i++)
            {
                if(currUser.roles[i] === "admin")
                {
                    return true;
                }
            }
            return false;
        }
    }
})();