/**
 * Created by lixie on 16/2/15.
 */

(function()
{
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService)
    {
        $scope.user = {"username":"",  "password":""};

        $scope.login = function(){

            var inputUsername = $scope.user.username;
            var inputPassword = $scope.user.password;

            UserService.findUserByCredentials(inputUsername, inputPassword, function(user) {
                if (user === null) {
                    alert("user not exist!");
                } else {
                    $rootScope.currUser = user;
                    $location.path("/profile");
                }
            });
        }
    }
})();