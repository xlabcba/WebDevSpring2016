/**
 * Created by lixie on 16/3/16.
 */

// load mock users data
var mock = require("./user.mock.json");
var Guid = require("../js/guid.js");

// pass app reference to model
module.exports = function() {

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUserById: updateUserById,
        deleteUserById: deleteUserById
    };
    return api;

    function createUser(user) {
        user._id = Guid.create(); //"ID_" + (new Date()).getTime();
        user.roles = [];
        mock.push(user);
        return mock;
    }

    function findAllUsers() {
        return mock;
    }

    function findUserById(userId) {
        for(var u in mock) {
            if( mock[u]._id == userId ) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for(var u in mock) {
            if( mock[u].username == username ) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for(var u in mock) {
            if( mock[u].username == credentials.username &&
                mock[u].password == credentials.password) {
                return mock[u];
            }
        }
        return null;
    }

    function updateUserById(userId, newUser) {
        for(var u in mock) {
            if(mock[u]._id == userId) {
                mock.splice(u,1, newUser);
                return mock;
            }
        }
        return null;
    }

    function deleteUserById(userId) {
        for(var u in mock) {
            if(mock[u]._id == userId) {
                mock.splice(u,1);
                return mock;
            }
        }
        return null;
    }

};