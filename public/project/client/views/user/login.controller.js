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
                        console.log(response.data);
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile_info");
                    },
                    function(err) {
                        alert("Sorry! We cannot recognize you!");
                    });

            /*
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function(response){
                    if(response.data) {
                        UserService.setCurrentUser(response.data);
                        $location.url("/profile_info");
                    }
                });
                */
        }
    }
})();