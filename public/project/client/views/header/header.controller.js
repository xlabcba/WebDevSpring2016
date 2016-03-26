/**
 * Created by lixie on 16/3/4.
 */

(function()
{
    angular
        .module("RecipeApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $scope, $location, UserService)
    {
        var vm = this;

        vm.logout = logout;
        vm.isLoggedIn = isLoggedIn;
        vm.isAdmin = isAdmin;
        vm.getCurrentUsername = getCurrentUsername;
        vm.localSearch = localSearch;

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
        function localSearch(searchStr) {
            $location.url("/home/"+searchStr);
        }
    }

})();