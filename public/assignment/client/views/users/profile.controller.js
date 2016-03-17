/**
 * Created by lixie on 16/2/15.
 */

(function()
{
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService)
    {
        var currUser = $rootScope.currentUser;

        var vm = this;

        //var username = $routeParams.username;
        //console.log(username);

        vm.update = update;
        vm.user = {};

        function init() {
            UserService
                .findUserById(currUser._id)
                .then(function (response) {
                    vm.user = response.data;
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
                    }
                });
        }

    }
})();