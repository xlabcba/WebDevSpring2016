/**
 * Created by lixie on 16/2/16.
 */

(function(){
    angular
        .module("DataModelApp")
        .factory("UserService", UserService);

    function UserService() {
        var users = [];

        var d1 = new Date('1990-04-02T24:00:00');
        var d2 = new Date('1985-04-29T24:00:00');
        var d3 = new Date('1963-10-09T24:00:00');
        var d4 = new Date('1964-06-02T24:00:00');
        var d5 = new Date('1985-11-23T24:00:00');

        users = [
            {"_id":123, "firstName":"Alice",   "lastName":"Wonderland", "username":"alice",   "password":"alice",   "email":"alice@gmail.com",   "birthday":d1, "roles":["admin","user"]},
            {"_id":234, "firstName":"Bob",     "lastName":"Hope",       "username":"bob",     "password":"bob",     "email":"bob@gmail.com",     "birthday":d2, "roles":["admin"]},
            {"_id":345, "firstName":"Charlie", "lastName":"Brown",      "username":"charlie", "password":"charlie", "email":"charlie@gmail.com", "birthday":d3, "roles":["user"]},
            {"_id":456, "firstName":"Dan",     "lastName":"Craig",      "username":"dan",     "password":"dan",     "email":"dan@gmail.com",     "birthday":d4, "roles":["admin","user"]},
            {"_id":567, "firstName":"Edward",  "lastName":"Norton",     "username":"ed",      "password":"ed",      "email":"ed@gmail.com",      "birthday":d5, "roles":["admin","user"]}
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