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

        function init() {
            vm.$location = $location;
            vm.users = [];

            vm.predicate = '';
            vm.reverse = false;

            UserService
                .findAllUsers()
                .then(function(response) {
                        console.log(response.data);
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
    }

})();