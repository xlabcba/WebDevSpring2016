/**
 * Created by lixie on 16/2/15.
 */

(function()
{
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService) {

        var vm = this;

        vm.login = login;

        function init() {
            vm.user = null;
        }
        init();

        function login(user) {
            if(!user) {
                alert('please provide login information');
                return;
            }
            if(!user.username) {
                alert('please provide username');
                return;
            }
            if(!user.password) {
                alert('please provide password');
                return;
            }
            UserService
                .login(user)
                .then(
                    function(response) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
            /*
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile");
                    }
                });
                */
        }
    }
})();