/**
 * Created by lixie on 16/3/4.
 */

(function()
{
    angular
        .module("RecipeApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService)
    {
        var vm = this;

        vm.register = register;

        function init() {

        }
        init();

        function register(user) {
            UserService
                .createUser(user)
                .then(function(response){
                    setUser(user);
                });
        }

        function setUser(user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function(response){
                    var currentUser = response.data;
                    if(currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                        $location.url("/profile_info");
                    }
                });
        }

    }
})();