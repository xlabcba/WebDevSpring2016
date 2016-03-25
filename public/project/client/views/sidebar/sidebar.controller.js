(function()
{
    angular
        .module("RecipeApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($rootScope, $scope, $location, UserService)
    {
        var vm = this;

        vm.isProfile = isProfile;
        vm.isAdmin = isAdmin;
        vm.isProfileOrAdmin = isProfileOrAdmin;

        function init() {
            vm.$location = $location;
            console.log(vm.$location.url());
        }
        init();

        function isProfile() {
            return vm.$location.url().indexOf('profile') > 0;
        }
        function isAdmin() {
            return vm.$location.url().indexOf('admin') > 0;
        }

        function isProfileOrAdmin() {
            return (isProfile() || isAdmin());
        }
    }
})();