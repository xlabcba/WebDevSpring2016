/**
 * Created by lixie on 16/2/15.
 */

(function()
{
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $scope, $location, UserService) {

        var vm = this;

        vm.logout = logout;
        vm.isLoggedIn = isLoggedIn;
        vm.isAdmin = isAdmin;
        vm.getCurrentUsername = getCurrentUsername;

        function init() {
            vm.$location = $location;
        }
        init();

        function logout() {
            UserService.setCurrentUser(null);
            $location.url("/home");
        }

        function isLoggedIn() {
            return UserService.isLoggedIn();
        }
        function isAdmin() {
            return UserService.isAdmin();
        }

        function getCurrentUsername() {
            return UserService.getCurrentUsername();
        }

    }

})();