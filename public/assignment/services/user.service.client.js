/**
 * Created by lixie on 16/2/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [];

        users = [
            {"_id":123, "firstName":"Alice",   "lastName":"Wonderland", "username":"alice",   "password":"alice",   "roles": ["student"],          "email":""},
            {"_id":234, "firstName":"Bob",     "lastName":"Hope",       "username":"bob",     "password":"bob",     "roles": ["admin"],            "email":""},
            {"_id":345, "firstName":"Charlie", "lastName":"Brown",      "username":"charlie", "password":"charlie", "roles": ["faculty"],          "email":""},
            {"_id":456, "firstName":"Dan",     "lastName":"Craig",      "username":"dan",     "password":"dan",     "roles": ["faculty", "admin"], "email":""},
            {"_id":567, "firstName":"Edward",  "lastName":"Norton",     "username":"ed",      "password":"ed",      "roles": ["student"],          "email":""}
        ];

        var service = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return service;

        function findUserByCredentials(username, password, callback) {
            for(var i=0; i<users.length; i++)
            {
                if(users[i].username === username && users[i].password === password)
                {
                    callback(users[i]);
                    return;
                }
            }
            callback(null);
            return;
        }

        function findAllUsers(callback) {
            callback(users);
            return;
        }

        function createUser(user, callback) {
            var d = new Date();
            var n = d.getTime();
            user._id = n;
            users.push(user);
            callback(user);
            return;
        }

        function deleteUserById(userId, callback) {
            for(var i=0; i<users.length; i++)
            {
                if(users[i]._id === userId)
                {
                    users.splice(i,1);
                    callback(users);
                    break;
                }
            }
            return;
        }

        function updateUser(userId, user, callback) {
            for(var i=0; i<users.length; i++)
            {
                if(users[i]._id === userId)
                {
                    users.splice(i,1,user);
                    callback(users[i]);
                    break;
                }
            }
            return;
        }
    }
})();