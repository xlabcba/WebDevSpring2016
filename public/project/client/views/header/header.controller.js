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
            console.log("initial HEADER");
            vm.currUser = UserService.getCurrentUser();
            console.log(vm.currUser);
            vm.searchStr = "";
        }
        init();

        function logout() {

            UserService
                .logout()
                .then(
                    function(response){
                        UserService.setCurrentUser(null);
                        $location.url("/home");
                    },
                    function(err) {
                        vm.error = err;
                    });

            /*
            UserService.setCurrentUser(null);
            $location.url("/home");
            */
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

        function localSearch(selectedObject) {
            console.log(selectedObject);

            if (selectedObject == null || selectedObject == undefined) {
                alert("please input some key word for searching recipe");
                return;
            }

            if(selectedObject.title != null && selectedObject.title != undefined) {
                console.log("if 1");
                $location.url("/home/"+selectedObject.title);
            } else if(selectedObject != null && selectedObject != undefined) {
                console.log("if 2");
                $location.url("/home/"+selectedObject);
            }
        }
    }

})();