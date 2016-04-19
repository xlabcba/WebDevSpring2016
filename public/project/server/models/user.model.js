/**
 * Created by lixie on 16/3/23.
 */

// load mock forms data
// var mock = require("./user.mock.json");
// var Guid = require("../js/guid.js");

// load q promise library
var q = require("q");

module.exports = function(db, mongoose) {

    // load user schema
    var UsersSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UsersModel = mongoose.model('projectUser', UsersSchema);

    var api = {

        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUserById: updateUserById,
        followUser: followUser,
        followByUser: followByUser,
        unfollowUser: unfollowUser,
        unfollowByUser: unfollowByUser,
        likeRecipe: likeRecipe,
        unlikeRecipe: unlikeRecipe,
        deleteRecipeFromLike: deleteRecipeFromLike,
        deleteUserFromFollower: deleteUserFromFollower,
        findFollowedUsersForUser: findFollowedUsersForUser,
        updateProfilePic: updateProfilePic

    };
    return api;

    function findUserByCredentials(credentials) {
        /*
        for(var u in mock) {
            if(mock[u].username == username && mock[u].password == password) {
                return mock[u];
            }
        }
        return null;
        */

        var deferred = q.defer();

        // find one retrieves one document
        UsersModel.findOne(

            // first argument is predicate
            { username: credentials.username,
                password: credentials.password },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
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

    function findUserByUsername(username) {
        /*
        for(var u in mock) {
            if(mock[u].username == username) {
                return mock[u];
            }
        }
        return null;
        */

        var deferred = q.defer();

        // find one retrieves one document
        UsersModel.findOne(

            // first argument is predicate
            { username: username },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // console.log("fail to find user by username");
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // console.log("success to find user by username");
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function findUserById(userId) {
        /*
        for(var u in mock) {
            if(mock[u]._id == userId) {
                return mock[u];
            }
        }
        return null;
        */

        var deferred = q.defer();

        UsersModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        /*
        return mock;\
        */

        var deferred = q.defer();

        // find one retrieves one document
        UsersModel.find(
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

    function createUser(user) {
        /*
        var newUser = {
            _id: Guid.create(),
            photo: user.photo,
            gender: user.gender,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            password: user.password,
            email: user.email,
            birthday: user.birthday,
            follow: [],
            followBy: [],
            like: [],
            intro: user.intro,
            roles:["user"]
        };
        mock.push(newUser);
        return mock;
        */

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        UsersModel.create(user, function (err, doc) {

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

    function deleteUserById(userId) {
        /*
        for(var w in mock) {
            if(mock[w]._id == userId) {
                mock.splice(w,1);
                return mock;
            }
        }
        return null;
        */

        var deferred = q.defer();

        // find one retrieves one document
        UsersModel.remove(

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

    function updateUserById(userId, user) {
        /*
        for(var u in mock) {
            if(mock[u]._id == userId) {
                mock.splice(u,1,user);
                return mock;
            }
        }
        return null;
        */

        var deferred = q.defer();

        // find one retrieves one document
        UsersModel.update(

            // first argument is id
            { _id: userId },

            // second argument is object to update
            { $set: user },

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

    function followUser(followerId, followedId) {
        /*
        for(var u in mock) {
            if(mock[u]._id == followerId) {
                mock[u].follow.push(followedId);
                return mock[u];
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        // insert followedId with mongoose user model's findById
        UsersModel.findById(followerId, function (err, follower) {
            if (!err) {
                if(follower) {
                    follower.follow.push(followedId);
                    follower.save(function (err) {
                        if (!err) {
                            deferred.resolve(follower);
                        } else {
                            deferred.reject(err);
                        }
                    });
                } else {
                    deferred.resolve(follower);
                }
            } else {
                // reject promise if error
                deferred.reject(err);
            }
        });

        // return a promise
        return deferred.promise;

    }

    function followByUser(followerId, followedId) {
        /*
        for(var u in mock) {
            if(mock[u]._id == followedId) {
                mock[u].followBy.push(followerId);
                return mock[u];
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        // insert followerId with mongoose user model's findById
        UsersModel.findById(followedId, function (err, followed) {
            if (!err) {
                if(followed) {
                    followed.followBy.push(followerId);
                    followed.save(function (err) {
                        if (!err) {
                            deferred.resolve(followed);
                        } else {
                            deferred.reject(err);
                        }
                    });
                } else {
                    deferred.resolve(followed);
                }
            } else {
                // reject promise if error
                deferred.reject(err);
            }
        });

        // return a promise
        return deferred.promise;

    }

    function unfollowUser(followerId, followedId) {
        /*
        for(var u in mock) {
            if(mock[u]._id == followerId) {
                for(var v in mock[u].follow) {
                    if(mock[u].follow[v] == followedId) {
                        mock[u].follow.splice(v,1);
                        console.log("success unfollow!");
                        return mock[u];
                    }
                }
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        // remove followedId with mongoose user model's findById
        UsersModel.update(
            { _id: followerId },
            { $pull: { follow: followedId } },
            { multi: true },
            function (err, numAffected) {
                if (!err) {
                    deferred.resolve(numAffected)
                } else {
                    // reject promise if error
                    deferred.reject(err);
                }
            });

        // return a promise
        return deferred.promise;

    }

    function unfollowByUser(followerId, followedId) {
        /*
        for(var u in mock) {
            if(mock[u]._id == followedId) {
                for(var v in mock[u].followBy) {
                    if(mock[u].followBy[v] == followerId) {
                        mock[u].followBy.splice(v,1);
                        console.log("success unfollowBy!");
                        return mock[u];
                    }
                }
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        // remove followerId with mongoose user model's findById
        UsersModel.update(
            { _id: followedId },
            { $pull: { followBy: followerId } },
            { multi: true },
            function (err, numAffected) {
                if (!err) {
                    deferred.resolve(numAffected)
                } else {
                    // reject promise if error
                    deferred.reject(err);
                }
            });

        // return a promise
        return deferred.promise;

    }

    function likeRecipe(userId, recipeId) {
        /*
        for(var u in mock) {
            if(mock[u]._id == userId) {
                mock[u].like.push(recipeId);
                return mock[u];
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        // insert recipeId with mongoose user model's findById
        UsersModel.findById(userId, function (err, user) {
            if (!err) {
                if(user) {
                    user.like.push(recipeId);
                    user.save(function (err) {
                        if (!err) {
                            deferred.resolve(user);
                        } else {
                            deferred.reject(err);
                        }
                    });
                } else {
                    deferred.resolve(user);
                }
            } else {
                // reject promise if error
                deferred.reject(err);
            }
        });

        // return a promise
        return deferred.promise;

    }

    function unlikeRecipe(userId, recipeId) {
        /*
        for(var u in mock) {
            if(mock[u]._id == userId) {
                for(var v in mock[u].like) {
                    if(mock[u].like[v] == recipeId) {
                        mock[u].like.splice(v,1);
                        return mock[u];
                    }
                }
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        // remove recipeId with mongoose user model's update
        UsersModel.update(
            { _id: userId },
            { $pull: { like: recipeId } },
            { multi: true },
            function (err, numAffected) {
                if (!err) {
                    deferred.resolve(numAffected)
                } else {
                    // reject promise if error
                    deferred.reject(err);
                }
            });

        // return a promise
        return deferred.promise;

    }

    function deleteRecipeFromLike(recipeId) {
        /*
        for(var u in mock) {
            for(var v in mock[u].like) {
                if(mock[u].like[v] == recipeId) {
                    mock[u].like.splice(v,1);
                }
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        // remove recipeId with mongoose user model's update
        UsersModel.update(
            {  },
            { $pull: { like: recipeId } },
            { multi: true },
            function (err, numAffected) {
                if (!err) {
                    deferred.resolve(numAffected)
                } else {
                    // reject promise if error
                    deferred.reject(err);
                }
            });

        // return a promise
        return deferred.promise;

    }

    function deleteUserFromFollower(userId) {
        /*
        for(var u in mock) {
            for(var v in mock[u].follow) {
                if(mock[u].follow[v] == userId) {
                    mock[u].follow.splice(v,1);
                    return mock[u].follow;
                }
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        // remove followedId with mongoose user model's update
        UsersModel.update(
            {  },
            { $pull: { follow: userId } },
            { multi: true },
            function (err, numAffected) {
                if (!err) {
                    deferred.resolve(numAffected)
                } else {
                    // reject promise if error
                    deferred.reject(err);
                }
            });

        // return a promise
        return deferred.promise;

    }

    function findFollowedUsersForUser(followingUsers) {
        /*
        var ret_users = [];
        for(var u in followingUsers) {
            var user = findUserById(followingUsers[u]);
            if(user) {
                ret_users.push(user);
            }
        }
        return ret_users;
        */

        // use q to defer the response
        var deferred = q.defer();

        // find retrieves all qualified document
        UsersModel.find(

            // first argument is predicate
            { _id: { $in: followingUsers }},

            // doc is unique instance matches predicate
            function(err, docs) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(docs);
                }

            });

        // return a promise
        return deferred.promise;

    }

    function updateProfilePic(userId, savePath) {
        /*
        for(var u in mock) {
            if(mock[u]._id == userId) {
                mock[u].photo = savePath;
                return mock[u];
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        // update updates specified fields of qualified document
        UsersModel.update(

            // first argument is id
            { _id: userId },

            // second argument is object to update
            { $set: { photo: savePath }},

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

        // return a promise
        return deferred.promise;

    }
};