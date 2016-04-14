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

        function init() {
            vm.user = {};
        }
        init();

        function register(user) {
            if (!user.username) {
                alert("Please input username!");
                return;
            }
            if (!user.password) {
                alert("Please input password!");
                return;
            }
            if (!vm.confirmPassword) {
                alert("Please confirm password!");
                return;
            }
            if (!user.emails) {
                alert("Please input one email address!");
                return;
            }
            if (!user.phones) {
                alert("Please input one phone number!");
                return;
            }
            if (user.password != vm.confirmPassword) {
                alert("Your passwords don't match");
                return;
            }

            UserService
                .register(user)
                .then(
                    function(response) {
                        var user = response.data;
                        if(user != null) {
                            $rootScope.currentUser = user;
                            $location.url("/profile");
                        }
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
            /*
            UserService
                .createUser(user)
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                });
                */
        }
    }
})();