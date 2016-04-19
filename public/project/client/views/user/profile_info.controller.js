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
        vm.deletePhoto = deletePhoto;
        vm.noPic = noPic;

        function init() {
            //console.log("HERE I AM!");
            vm.uploadme = {};
            vm.user = {};
            vm.currUser = UserService.getCurrentUser();
            //vm.files = [];
            vm.fileName = null;

            UserService
                .findUserById(vm.currUser._id)
                .then(function (response) {
                    vm.user = response.data;
                    UserService.setCurrentUser(vm.user);
                    vm.user.birthday = new Date(response.data.birthday);
                    if(vm.user.photo) {
                        var photoArray = vm.user.photo.split("/");
                        vm.fileName = photoArray[photoArray.length - 1];
                        //console.log(vm.fileName);
                    }
                });

            /*
            UserService
                .getProfilePhoto()
                .then(function(response){
                     console.log(response.data);
                    vm.files = response.data;
                })
                */
        }
        init();

        function update(user) {

            if (!user.username) {
                alert("username cannot be empty!");
                return;
            }
            if (!user.password) {
                alert("password cannot be empty!");
                return;
            }

            var newUser = {
                gender: user.gender,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
                email: user.email,
                birthday: user.birthday,
                intro: user.intro
            };

            UserService
                .updateUser(user._id, newUser)
                .then(function(response){
                    init()
                });
        }

        /*
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
        */

        function deletePhoto() {
            UserService
                .deleteProfilePhoto(vm.currUser._id, vm.fileName)
                .then(function(response){
                    vm.user.photo = null;
                })
        }

        function noPic(pic) {
            return (pic == null || pic == undefined || pic.length == 0);
        }
    }
})();