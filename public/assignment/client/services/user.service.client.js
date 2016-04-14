/**
 * Created by lixie on 16/3/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {

        var service = {
            login: login,
            logout: logout,
            loggedin: loggedin,
            register: register,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            getCurrentUser: getCurrentUser,
            getCurrentUsername: getCurrentUsername,
            setCurrentUser: setCurrentUser,
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin,
            findAllUsersByAdmin: findAllUsersByAdmin,
            createUserByAdmin: createUserByAdmin,
            updateUserByAdmin: updateUserByAdmin,
            deleteUserByAdmin: deleteUserByAdmin
        };

        return service;

        function login(user) {
            console.log("here login");
            console.log(user);
            return $http.post("/api/assignment/login", user);
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function loggedin() {
            return $http.get("/api/assignment/loggedin");
        }

        function register(user) {
            return $http.post("/api/assignment/register", user);
        }

        function findUserById(userId) {
            return $http.get("/api/assignment/user/"+userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username="+username+"&password="+password);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/"+userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/"+userId, user);
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function getCurrentUsername() {
            if (isLoggedIn()) {
                return $rootScope.currentUser.username;
            } else {
                return null;
            }
        }

        function isLoggedIn() {
            return ($rootScope.currentUser !== undefined && $rootScope.currentUser !== null);
        }

        function isAdmin() {
            return (isLoggedIn() && $rootScope.currentUser.roles.indexOf("admin") >= 0);
        }

        function findAllUsersByAdmin() {
            return $http.get("/api/assignment/admin/user");
        }

        function createUserByAdmin(newUser) {
            return $http.post("/api/assignment/admin/user", newUser);
        }

        function updateUserByAdmin(userId, newUser) {
            console.log("here I am updating user");
            return $http.put("/api/assignment/admin/user/"+userId, newUser);
        }

        function deleteUserByAdmin(userId) {
            return $http.delete("/api/assignment/admin/user/"+userId);
        }

    }
})();