/**
 * Created by lixie on 16/2/17.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, $scope, $location, UserService, $routeParams) {

        var vm = this;

        vm.order = order;
        vm.isTopUsername = isTopUsername;
        vm.isBottomUsername = isBottomUsername;
        vm.isTopFirstName = isTopFirstName;
        vm.isBottomFirstName = isBottomFirstName;
        vm.isTopLastName = isTopLastName;
        vm.isBottomLastName = isBottomLastName;
        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.selectUser = selectUser;

        function init() {
            vm.$location = $location;
            vm.users = [];
            vm.selectedUser = {};
            vm.newUserRoles = null;

            vm.predicate = '';
            vm.reverse = false;

            UserService
                .findAllUsersByAdmin()
                .then(function(response) {
                        vm.users = response.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
        init();

        function order(predicate) {
            vm.predicate = predicate;
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            console.log(vm.predicate);
            console.log(vm.reverse);
        }

        function isTopUsername() {
            return (vm.predicate === 'username' && vm.reverse === false);
        }

        function isBottomUsername() {
            return (vm.predicate === 'username' && vm.reverse === true);
        }

        function isTopFirstName() {
            return (vm.predicate === 'firstName' && vm.reverse === false);
        }

        function isBottomFirstName() {
            return (vm.predicate === 'firstName' && vm.reverse === true);
        }

        function isTopLastName() {
            return (vm.predicate === 'lastName' && vm.reverse === false);
        }

        function isBottomLastName() {
            return (vm.predicate === 'lastName' && vm.reverse === true);
        }

        var currUser = $rootScope.currentUser;

        function addUser(user) {
            var newUser = {
                "username": user.username,
                "password": user.password,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "roles": vm.newUserRoles.split(","),
                "emails": user.emails,
                "phones": user.phones
            };
            UserService
                .createUserByAdmin(newUser)
                .then(function(response){
                    init();
                });
        }

        function updateUser(user) {
            console.log(user);
            var newUser = {
                "username": user.username,
                "password": user.password,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "roles": vm.newUserRoles.split(","),
                "emails": user.emails,
                "phones": user.phones
            };
            console.log(newUser);

            UserService
                .updateUserByAdmin(user._id, newUser)
                .then(function(response){
                    init();
                });
        }

        function deleteUser(index) {
            UserService
                .deleteUserByAdmin(vm.users[index]._id)
                .then(function(response){
                    init()
                });
        }

        function selectUser(index) {
            vm.selectedUser = {
                "_id": vm.users[index]._id,
                "username": vm.users[index].username,
                "password": vm.users[index].password,
                "firstName": vm.users[index].firstName,
                "lastName": vm.users[index].lastName,
                "roles": vm.users[index].roles,
                "emails": vm.users[index].emails,
                "phones": vm.users[index].phones
            };
            vm.newUserRoles = vm.selectedUser.roles.join(",")
        }


    }

})();