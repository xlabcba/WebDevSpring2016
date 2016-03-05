/**
 * Created by lixie on 16/3/4.
 */

(function() {
    angular
        .module("DataModelApp")
        .controller("UserController", UserController);

    function UserController($scope, $rootScope, $location, UserService) {

        var currUser = $rootScope.currUser;
        var selectedUserIndex = -1;
        $scope.newUser = {"_id":0, "firstName":"", "lastName":"", "username":"", "password":"", "email":"", "birthday":""};


        $scope.users = [];
        UserService.findAllUsers(function (users) {
            $scope.users = users;
        });

        $scope.createUser = function(){
            var newUser =
            {   "_id":0,
                "firstName": $scope.newUser.firstName,
                "lastName": $scope.newUser.lastName,
                "username": $scope.newUser.username,
                "password": $scope.newUser.password,
                "email": $scope.newUser.email,
                "birthday": $scope.newUser.birthday
            };
            UserService.createUser(newUser, function(user) {
                UserService.findAllUsers(function (users) {
                    $scope.users = users;
                });
                $scope.newUser = {"_id":0, "firstName":"", "lastName":"", "username":"", "password":"", "email":"", "birthday":""};
                selectedUserIndex = -1;
            });
        }

        $scope.selectUser = function(index){
            selectedUserIndex = index;
            $scope.newUser =
            {   "_id": $scope.users[selectedUserIndex]._id,
                "firstName": $scope.users[selectedUserIndex].firstName,
                "lastName": $scope.users[selectedUserIndex].lastName,
                "username": $scope.users[selectedUserIndex].username,
                "password": $scope.users[selectedUserIndex].password,
                "email": $scope.users[selectedUserIndex].email,
                "birthday": $scope.users[selectedUserIndex].birthday
            };
        }

        $scope.updateUser = function(){
            if (selectedUserIndex >= 0) {
                var newUser =
                {   "_id": $scope.newUser._id,
                    "firstName": $scope.newUser.firstName,
                    "lastName": $scope.newUser.lastName,
                    "username": $scope.newUser.username,
                    "password": $scope.newUser.password,
                    "email": $scope.newUser.email,
                    "birthday": $scope.newUser.birthday
                };
                UserService.updateUser(newUser._id, newUser, function(user) {
                    UserService.findAllUsers(function (users) {
                        $scope.users = users;
                    });
                    $scope.newUser = {"_id":0, "firstName":"", "lastName":"", "username":"", "password":"", "email":"", "birthday":""};
                    selectedUserIndex = -1;
                });
            }
        }

        $scope.deleteUser = function (index) {
            var delUser =
            {   "_id": $scope.users[index]._id,
                "firstName": $scope.users[index].firstName,
                "lastName": $scope.users[index].lastName,
                "username": $scope.users[index].username,
                "password": $scope.users[index].password,
                "email": $scope.users[index].email,
                "birthday": $scope.users[index].birthday
            };

            UserService.deleteUserById(delUser._id, function(users) {
                $scope.newUser = {"_id":0, "firstName":"", "lastName":"", "username":"", "password":"", "email":"", "birthday":""};
                UserService.findAllUsers(function (users) {
                    $scope.users = users;
                });
            });
        }
    }
})();