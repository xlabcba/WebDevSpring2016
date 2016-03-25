/**
 * Created by lixie on 16/3/23.
 */

// load mock forms data
var mock = require("./user.mock.json");
var Guid = require("../js/guid.js");

module.exports = function(recipeModel, commentModel) {

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
        deleteUserFromFollower: deleteUserFromFollower

    };
    return api;

    function findUserByCredentials(username, password) {
        for(var u in mock) {
            if(mock[u].username == username && mock[u].password == password) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for(var u in mock) {
            if(mock[u].username == username) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserById(userId) {
        for(var u in mock) {
            if(mock[u]._id == userId) {
                return mock[u];
            }
        }
        return null;
    }

    function findAllUsers() {
        return mock;
    }

    function createUser(user) {
        var newUser = {
            _id:345,
            photo: user.photo,
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
    }

    function deleteUserById(userId) {
        recipeModel.deleteRecipeOfUser(userId);
        commentModel.deleteCommentOfUser(userId);
        deleteUserFromFollower(userId);
        /* delete from mock*/
        for(var w in mock) {
            if(mock[w]._id == userId) {
                mock.splice(w,1);
                return mock;
            }
        }
        return null;
    }

    function updateUserById(userId, user) {
        for(var u in mock) {
            if(mock[u]._id == userId) {
                mock.splice(u,1,user);
                return mock;
            }
        }
        return null;
    }

    function followUser(followerId, followedId) {
        for(var u in mock) {
            if(mock[u]._id == followerId) {
                mock[u].follow.push(followedId);
                return mock[u];
            }
        }
        return null;
    }

    function followByUser(followerId, followedId) {
        for(var u in mock) {
            if(mock[u]._id == followedId) {
                mock[u].followBy.push(followerId);
                return mock[u];
            }
        }
        return null;
    }

    function unfollowUser(followerId, followedId) {
        for(var u in mock) {
            if(mock[u]._id == followerId) {
                for(var v in mock[u].follow) {
                    if(mock[u].follow[v] == followedId) {
                        mock[u].follow.splice(v,1);
                        return mock[u];
                    }
                }
            }
        }
        return null;
    }

    function unfollowByUser(followerId, followedId) {
        for(var u in mock) {
            if(mock[u]._id == followedId) {
                for(var v in mock[u].followBy) {
                    if(mock[u].followBy[v] == followerId) {
                        mock[u].followBy.splice(v,1);
                        return mock[u];
                    }
                }
            }
        }
        return null;
    }

    function likeRecipe(userId, recipeId) {
        for(var u in mock) {
            if(mock[u]._id == userId) {
                mock[u].like.push(recipeId);
                return mock[u];
            }
        }
        return null;
    }

    function unlikeRecipe(userId, recipeId) {
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
    }

    function deleteRecipeFromLike(recipeId) {
        for(var u in mock) {
            for(var v in mock[u].like) {
                if(mock[u].like[v] == recipeId) {
                    mock[u].like.splice(v,1);
                }
            }
        }
        return null;
    }

    function deleteUserFromFollower(userId) {
        for(var u in mock) {
            for(var v in mock[u].follow) {
                if(mock[u].follow[v] == userId) {
                    mock[u].follow.splice(v,1);
                }
            }
        }
        return null;
    }


};