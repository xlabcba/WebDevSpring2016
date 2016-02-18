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
        $scope.register = function(){
            var user = {};
            var inputUsername = $scope.user.username;
            // var inputPassword1 = $scope.user.password1;
            var inputPassword2 = $scope.user.password2;
            // var inputEmail = $scope.user.email;
            var user = {"_id":0, "firstName":"Unknown", "lastName":"Unknown", "username":inputUsername,
                        "password":inputPassword2, "roles": ["student"]}; //changer for roles later


            UserService.createUser(user, function(user) {
                $rootScope.currUser = user;
                $location.path("/profile");
            });
        }
    }
})();