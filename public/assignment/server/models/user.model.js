/**
 * Created by lixie on 16/3/16.
 */

// load mock users data
//var mock = require("./user.mock.json");

// load guid
//var Guid = require("../js/guid.js");

// load q promise library
var q = require("q");

// pass app reference to model
module.exports = function(db, mongoose) {

    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('User', UserSchema);

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
        /*
        user._id = Guid.create(); //"ID_" + (new Date()).getTime();
        user.roles = [];
        mock.push(user);
        return mock;
        */

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        UserModel.create(user, function (err, doc) {

            if (!err) {
                // resolve promise
                deferred.resolve(doc);
            } else {
                // reject promise if error
                deferred.reject(err);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function findAllUsers() {
        /*
        return mock;
        */

        var deferred = q.defer();

        // find one retrieves one document
        UserModel.find(
            // doc is unique instance matches predicate
            function(err, users) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(users);
                }
            });

        return deferred.promise;
    }

    function findUserById(userId) {
        /*
        for(var u in mock) {
            if( mock[u]._id == userId ) {
                return mock[u];
            }
        }
        return null;
        */

        var deferred = q.defer();

        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }

    function findUserByUsername(username) {
        /*
        for(var u in mock) {
            if( mock[u].username == username ) {
                return mock[u];
            }
        }
        return null;
        */


        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(

            // first argument is predicate
            { username: username },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;


    }

    function findUserByCredentials(credentials) {
        /*
        for(var u in mock) {
            if( mock[u].username == credentials.username &&
                mock[u].password == credentials.password) {
                return mock[u];
            }
        }
        return null;
        */

        //console.log(credentials);

        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(

            // first argument is predicate
            { username: credentials.username,
                password: credentials.password },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    console.log("fail find one by credentials!");
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    //console.log(doc);
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;

    }

    function updateUserById(userId, newUser) {
        /*
        for(var u in mock) {
            if(mock[u]._id == userId) {
                mock.splice(u,1, newUser);
                return mock;
            }
        }
        return null;
        */

        var deferred = q.defer();

        // find one retrieves one document
        UserModel.update(

            // first argument is id
            { _id: userId },

            // second argument is object to update
            { $set: newUser },

            // doc is unique instance matches predicate
            function(err, stats) {

                if (!err) {
                    // resolve promise
                    deferred.resolve(stats);
                } else {
                    // reject promise if error
                    deferred.reject(err);
                }

            });

        return deferred.promise;
    }

    function deleteUserById(userId) {
        /*
        for(var u in mock) {
            if(mock[u]._id == userId) {
                mock.splice(u,1);
                return mock;
            }
        }
        return null;
        */

        var deferred = q.defer();

        // find one retrieves one document
        UserModel.remove(

            // first argument is id
            { _id: userId },

            // doc is unique instance matches predicate
            function(err, stats) {

                if (!err) {
                    // resolve promise
                    deferred.resolve(stats);
                } else {
                    // reject promise if error
                    deferred.reject(err);
                }

            });

        return deferred.promise;
    }

};