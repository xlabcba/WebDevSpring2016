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

        }
        init();

        function register(user) {
            if (!user.emails) {
                alert("Please input one email address!");
                return;
            }
            if (!user.phones) {
                alert("Please input one phone number!");
                return;
            }
            console.log(user.phones);
            UserService
                .createUser(user)
                .then(function(response){
                    UserService.setCurrentUser(response.data);
                    $location.url("/profile");
                });
        }
    }
})();