(function(){
    angular
        .module("RecipeApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {

        var service = {
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            followUser: followUser,
            getCurrentUser: getCurrentUser,
            getCurrentUsername: getCurrentUsername,
            setCurrentUser: setCurrentUser,
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin
        };

        return service;

        function findUserById(userId) {
            return $http.get("/api/project/user/"+userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/project/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            console.log(username);
            console.log(password);
            return $http.get("/api/project/user?username="+username+"&password="+password);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/"+userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/"+userId, user);
        }

        function followUser(followerId, followedId) {
            return $http.post("/api/project/user/"+followerId+"/user/"+followedId);
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

    }
})();