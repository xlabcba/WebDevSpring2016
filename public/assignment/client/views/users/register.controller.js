/**
 * Created by lixie on 16/2/15.
 */

(function()
{
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService)
    {
        var vm = this;

        vm.register = register;
        vm.newEmail = null;
        vm.newPhone = null;

        function init() {

        }
        init();

        function register(user) {
            UserService
                .createUser(user)
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                });
        }
    }
})();