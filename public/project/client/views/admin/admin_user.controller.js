/**
 * Created by lixie on 16/3/23.
 */

(function()
{
    angular
        .module("RecipeApp")
        .controller("AdminUserController", AdminUserController);

    function AdminUserController($rootScope, $scope, $location, UserService)
    {
        var vm = this;

        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;
        vm.setModalUser = setModalUser;
        vm.cleanModalUser = cleanModalUser;
        vm.noPic = noPic;

        function init() {
            vm.checkboxes = { admin: false, user: false };
            vm.modalUser = {};
            vm.users = [];
            UserService
                .findAllUsers()
                .then(function(response){
                    console.log(response.data);
                    vm.users = response.data;
                });
        }
        init();

        function deleteUser(user) {
            UserService
                .deleteUserById(user._id)
                .then(function(response){
                    init()
                });
        }

        function updateUser(user) {

            if(!user.password) {
                alert("password cannot be empty");
            }

            user.roles = [];
            if (vm.checkboxes.admin) {
                user.roles.push("admin");
            }
            if (vm.checkboxes.user) {
                user.roles.push("user");
            }

            var newUser = {
                _id: user._id,
                photo: user.photo,
                gender: user.gender,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                email: user.email,
                birthday: user.birthday,
                follow: user.follow,
                followBy: user.followBy,
                like: user.like,
                intro: user.intro,
                roles: user.roles
            };

            UserService
                .updateUser(user._id, newUser)
                .then(function(response){
                    console.log(response.data);
                    init();
                });
        }

        function setModalUser(user) {
            vm.modalUser = {
                _id: user._id,
                photo: user.photo,
                gender: user.gender,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                email: user.email,
                birthday: user.birthday,
                follow: user.follow,
                followBy: user.followBy,
                like: user.like,
                intro: user.intro,
                roles: user.roles
            };

            if(vm.modalUser.roles.indexOf("admin") >= 0) {
                vm.checkboxes.admin = true;
            }
            if(vm.modalUser.roles.indexOf("user") >= 0) {
                vm.checkboxes.user = true;
            }
        }

        function cleanModalUser() {
            vm.modalUser = {};
            vm.checkboxes = { admin: false, user: false };
        }

        function noPic(pic) {
            return (pic == null || pic == undefined || pic.length == 0);
        }
    }
})();