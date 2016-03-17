/**
 * Created by lixie on 16/2/15.
 */

(function()
{
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($rootScope, $scope, $location, UserService)
    {
        var vm = this;

        vm.isLoggedIn = isLoggedIn;
        vm.isAdmin = isAdmin;

        function init() {
            vm.$location = $location;
        }
        init();

        function isLoggedIn() {
            return UserService.isLoggedIn();
        }
        function isAdmin() {
            return UserService.isAdmin();
        }
    }
})();