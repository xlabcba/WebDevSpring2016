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
        var vm = this;

        vm.update = update;
        vm.user = {};
        vm.newEmail = null;
        vm.newPhone = null;

        function init() {
            console.log("HERE I AM!");
            var currUser = UserService.getCurrentUser();
            UserService
                .findUserById(currUser._id)
                .then(function (response) {
                    vm.user = response.data;
                    UserService.setCurrentUser(response.data);
                });
        }
        return init();

        function update(user) {
            if (vm.newEmail) {
                user.emails.push(vm.newEmail);
                vm.newEmail = null;
            }
            if (vm.newPhone) {
                user.phones.push(vm.newPhone);
                vm.newPhone = null;
            }

            user.emails = user.emails.filter(function(val) { return (val !== null && val !== undefined); });
            user.phones = user.phones.filter(function(val) { return (val !== null && val !== undefined); });

            var newUser = {
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                emails: user.emails,
                phones: user.phones
            };

            UserService
                .updateUser(user._id, newUser)
                .then(function(response){
                    init();
                });
        }

    }
})();