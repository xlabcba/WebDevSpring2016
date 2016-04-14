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

        vm.addEmail = addEmail;
        vm.addPhone = addPhone;
        vm.deleteEmail = deleteEmail;
        vm.deletePhone = deletePhone;
        vm.deleteNewEmail = deleteNewEmail;
        vm.deleteNewPhone = deleteNewPhone;
        vm.update = update;

        function init() {
            vm.user = {};
            vm.newEmails = [];
            vm.newPhones = [];
            var currUser = UserService.getCurrentUser();
            UserService
                .findUserById(currUser._id)
                .then(function (response) {
                    vm.user = {
                        username: response.data.username,
                        password: response.data.password,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        emails: response.data.emails,
                        phones: response.data.phones
                    };
                    UserService.setCurrentUser(response.data);
                });
        }
        return init();

        function addEmail() {
            vm.newEmails.push(null);
        }

        function addPhone() {
            vm.newPhones.push(null);
        }

        function deleteEmail(index) {
            vm.user.emails.splice(index, 1);
        }

        function deletePhone(index) {
            vm.user.phones.splice(index, 1);
        }

        function deleteNewEmail(index) {
            vm.newEmails.splice(index, 1);
        }

        function deleteNewPhone(index) {
            vm.newPhones.splice(index, 1);
        }

        function update(user) {

            if (!user.username) {
                vm.error = "username cannot be empty!";
            }
            if (!user.password) {
                vm.error = "password cannot be empty!";
            }

            vm.originalEmails = [];
            vm.originalPhones = [];
            vm.addedEmails = [];
            vm.addedPhones = [];

            vm.originalEmails = user.emails.filter(function(val) { return (val !== null && val !== undefined); });
            vm.originalPhones = user.phones.filter(function(val) { return (val !== null && val !== undefined); });
            vm.addedEmails = vm.newEmails.filter(function(val) { return (val !== null && val !== undefined); });
            vm.addedPhones = vm.newPhones.filter(function(val) { return (val !== null && val !== undefined); });

            if ((vm.originalEmails.length + vm.addedEmails) == 0) {
                vm.error = "At least one email address is required!";
            }
            if ((vm.originalPhones.length + vm.addedPhones) == 0) {
                vm.error = "At least one phone number is required!";
            }

            if (vm.addedEmails.length != 0) {
                user.emails = vm.originalEmails.concat(vm.addedEmails);
            }
            if (vm.newPhones.length != 0) {
                user.phones = vm.originalPhones.concat(vm.addedPhones);
            }

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
                .then(
                    function(response) {
                        init();
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }

    }
})();