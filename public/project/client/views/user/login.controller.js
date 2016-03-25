/**
 * Created by lixie on 16/3/4.
 */

(function()
{
    angular
        .module("RecipeApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService)
    {
        var vm = this;

        vm.login = login;

        function init() {
        }
        init();

        function login(user) {
            if(!user) {
                return;
            }
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile_info");
                    }
                });
        }
    }
})();