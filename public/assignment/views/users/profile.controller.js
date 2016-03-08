/**
 * Created by lixie on 16/2/15.
 */

(function()
{
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, UserService)
    {
        var currUser = $rootScope.currUser;

        $scope.user = {"firstName":"",  "lastName":"","username":"",  "password":""};
        $scope.user.username = currUser.username;
        $scope.user.firstName = currUser.firstName;
        $scope.user.lastName = currUser.lastName;
        $scope.user.password = currUser.password;
        $scope.user.email = currUser.email;

        $scope.update = function(){
            var inputUsername = $scope.user.username;
            var inputFirstname = $scope.user.firstName;
            var inputLastname = $scope.user.lastName;
            var inputPassword = $scope.user.password;
            var inputEmail = $scope.user.email;
            var roles = currUser.roles;
            var user = {"_id":currUser._id, "firstName":inputFirstname, "lastName":inputLastname,
                "username":inputUsername, "password":inputPassword, "roles":roles, "email":inputEmail};

            UserService.updateUser(user._id, user, function(user) {
                $rootScope.currUser = user;
            });
        }
    }
})();