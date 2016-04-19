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
            vm.user = {};
            vm.confirmPassword = null;
            vm.confirm = false;
        }
        init();

        function register(user) {
            //user.photo = "./images/head.jpg";
            //console.log("going to client service to register");

            /*
             UserService
             .createUser(user)
             .then(function(response){
             setUser(user);
             });
             */

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
            if (user.password != vm.confirmPassword) {
                alert("Your passwords don't match");
                return;
            }
            if (!vm.confirmCondition) {
                alert("Only >21 years old can register!");
                return;
            }

            user.photo = "";
            user.roles = ["user"];

            UserService
                .createUser(user)
                .then(
                    function (response) {
                        var user = response.data;
                        console.log(user);
                        if (user != null) {
                            UserService.setCurrentUser(user);
                            $location.url("/profile_info");
                        } else {
                            alert("User already exists!");
                        }
                    },
                    function (err) {
                        $scope.error = err;
                    });
        }

        /*
        function setUser(user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function(response){
                    console.log(response.data);
                    var currentUser = response.data;
                    if(currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                        $location.url("/profile_info");
                    }
                });
        }
        */

    }
})();