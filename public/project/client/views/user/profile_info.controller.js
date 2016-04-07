/**
 * Created by lixie on 16/3/4.
 */

(function()
{
    angular
        .module("RecipeApp")
        .controller("InfoController", InfoController);

    function InfoController($rootScope, UserService)
    {
        var vm = this;

        //var username = $routeParams.username;
        //console.log(username);

        vm.update = update;

        function init() {
            vm.user = {};
            vm.currUser = UserService.getCurrentUser();

            UserService
                .findUserById(vm.currUser._id)
                .then(function (response) {
                    vm.user = response.data;
                    vm.user.birthday = new Date(response.data.birthday);
                });
        }
        return init();

        function update(user) {
            UserService
                .updateUser(user._id, user)
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
                        vm.user = currentUser;
                        vm.user.birthday = new Date(currentUser.birthday);
                    }
                });
        }
    }
})();