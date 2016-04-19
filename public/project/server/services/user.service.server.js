/**
 * Created by lixie on 16/3/23.
 */

var passport         = require('passport');
var ProjectStrategy  = require('passport-local').Strategy;
var bcrypt           = require("bcrypt-nodejs");
var fs               = require("fs");
var path             = require("path");
var mv               = require("mv");
/*
var multer           = require('multer');
var upload           = multer({ dest: __dirname + '/../../../../public/uploads' });
*/

module.exports = function(app, userModelProj, recipeModel, commentModel) {

    //var files = [];

    var auth = authorized;
    var isAd = isAdmin;

    app.post  ("/api/project/login", passport.authenticate('projectStrategy'), login);
    app.get   ("/api/project/loggedin", loggedin);
    app.post  ("/api/project/logout", logout);
    app.post  ("/api/project/user", register);
    app.get   ("/api/project/user", getUser);
    app.get   ("/api/project/user/:id", getUserById);
    app.put   ("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);
    app.post  ("/api/project/user/:followerId/user/:followedId", userFollowsUser);
    app.put   ("/api/project/user/:followerId/user/:followedId", userUnfollowsUser);
    app.post  ("/api/project/user/searchFollowedUsers", getFollowedUsersForUser);
    app.post  ("/api/project/profile/upload", uploadProfilePic);
    app.post  ("/api/project/profile/:userId/delete/:fileName", deleteProfilePic);

    // start configure passport and local strategy

    passport.use('projectStrategy', new ProjectStrategy(ProjectStrategyFunction));
    //passport.serializeUser(serializeUser);
    //passport.deserializeUser(deserializeUser);

    function ProjectStrategyFunction(username, password, done) {
        // lookup user by username only. cant compare password since it's encrypted
        userModelProj
            .findUserByUsername(username)
            .then(
                function(user) {
                    // if the user exists, compare passwords with bcrypt.compareSync
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    /*
    function serializeUser(user, done) {
        console.log(user);
        console.log("serialize User Project");
        done(null, user);
    }

    function deserializeUser(user, done) {
        console.log(user);
        console.log("deserializeUser project");
        if (user.photo == undefined || user.photo == null) {
            console.log("if 1 project");
            userModelProj
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        } else {
            console.log("if 2 project");
            userModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }

    }
    */

    // finish configure passport and local strategy

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        /*
        var user = req.body;
        var users = userModel.createUser(user);
        //req.session.currentUser = user;
        res.json(users);
        */


        var newUser = req.body;
        newUser.roles = ['user'];
        //console.log(newUser);

        userModelProj
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        //console.log("here it is trapped!");
                        res.json(null);
                    } else {
                        //console.log("here it passed");
                        // encrypt the password when registering
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModelProj.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        //console.log("before log in");
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                //console.log("not error");
                                //console.log(user);
                                res.json(user);
                            }
                        });
                    } else {
                        res.status(400).send(err);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getUser(req, res) {
        if (Object.keys(req.query).length === 0) {
            userModelProj.findAllUsers()
                .then(
                    function ( users ) {
                        res.json(users);
                    },
                    function ( err ) {
                        res.status(400).send(err);
                    }
                );
        } else if (Object.keys(req.query).length === 1) {
            var username = req.query.username;
            userModelProj.findUserByUsername(username)
                .then(
                    function ( user ) {
                        res.json(user);
                    },
                    function ( err ) {
                        res.status(400).send(err);
                    }
                );
        } else if (Object.keys(req.query).length === 2) {
            var username = req.query.username;
            var password = req.query.password;
            var credentials = {"username": username, "password": password};
            //console.log(credentials);
            userModelProj.findUserByCredentials(credentials)
                .then(
                    function ( user ) {
                        res.json(user)
                    },
                    function ( err ) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(400).send(err);
        }
    }

    function getUserById(req, res) {
        var userId = req.params.id;
        if (!userId || userId == undefined) {
            userId = req.params.userId;
        }
        userModelProj.findUserById(userId)
            .then(
                function ( user ) {
                    res.json(user)
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUser(req, res) {
        /*
        var userId = req.params.id;
        var newUser = req.body;
        var users = userModel.updateUserById(userId, newUser);
        res.json(users);
        */

        var userId = req.params.id;
        if (!userId || userId == undefined) {
            userId = req.params.userId;
        }
        var newUser = req.body;
        //console.log("password check before update profile");
        //console.log(userId);
        //console.log(newUser);
        userModelProj
            .findUserById(userId)
            .then(
                function(user){
                    //console.log(user);
                    if (user.password != newUser.password) {
                        newUser.password = bcrypt.hashSync(newUser.password);
                    }
                    //console.log(newUser);
                    userModelProj
                        .updateUserById(userId, newUser)
                        .then(
                            function ( stats ) {
                                res.send(200);
                            },
                            function ( err ) {
                                res.status(400).send(err);
                            }
                        );
                },
                function(err){
                    res.status(400).send(err);
                }
            )

    }

    function deleteUser(req, res) {
        /*
        var userId = req.params.id;
        recipeModel.deleteRecipeOfUser(userId);
        commentModel.deleteCommentOfUser(userId);
        userModel.deleteUserFromFollower(userId);
        recipeModel.deleteUserFromLikeBy(userId);
        var users = userModel.deleteUserById(userId);
        res.json(users);
        */

        var userId = req.params.id;
        if (!userId || userId == undefined) {
            userId = req.params.userId;
        }

        //console.log(userId);
        //console.log("server side start");

        userModelProj.deleteUserFromFollower(userId)
            .then(
                function ( stats ) {
                    //console.log("finish 1");
                    return recipeModel.deleteUserFromLikeBy(userId);
                },
                function ( err ) {
                    //console.log("died 1");
                    res.status(400).send(err);
                })
            .then(
                function ( stats ) {
                    //console.log("finish 2");
                    return commentModel.findCommentedRecipeForUser(userId);
                },
                function ( err ) {
                    //console.log("died 2");
                    res.status(400).send(err);
                })
            .then(
                function ( recipeArray ) {
                    //console.log("finish 3");
                    return commentModel.deleteCommentOfUser(userId, recipeArray);
                },
                function ( err ) {
                    //console.log("died 3");
                    res.status(400).send(err);
                })
            .then(
                function ( recipeArray ) {
                    //console.log("finish 4");
                    return commentModel.updateCommentedRecipeForUser(recipeArray);
                },
                function ( err ) {
                    //console.log("died 4");
                    res.status(400).send(err);
                })
            .then(
                function ( stats ) {
                    //console.log("finish 5");
                    return recipeModel.deleteRecipeOfUser(userId);
                },
                function ( err ) {
                    //console.log("died 5");
                    res.status(400).send(err);
                })
            .then(
                function ( stats ) {
                    //console.log("finish 6");
                    return userModelProj.deleteUserById(userId);
                },
                function ( err ) {
                    //console.log("died 6");
                    res.status(400).send(err);
                })
            .then(
                function ( stats ) {
                    res.send(200);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function userFollowsUser(req, res) {
        /*
        var followerId = req.params.followerId;
        var followedId = req.params.followedId;
        userModel.followByUser(followerId, followedId);
        var user = userModel.followUser(followerId, followedId);
        res.json(user);
        */

        var followerId = req.params.followerId;
        var followedId = req.params.followedId;

        userModelProj.followByUser(followerId, followedId)
            .then(
                function ( docs ) {
                    return userModelProj.followUser(followerId, followedId);
                },
                function ( err ) {
                    res.status(400).send(err);
                })
            .then(
                function ( user ) {
                    res.json(user);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    function userUnfollowsUser(req, res) {
        /*
        var followerId = req.params.followerId;
        var followedId = req.params.followedId;
        console.log(followerId);
        console.log(followedId);
        userModel.unfollowByUser(followerId, followedId);
        var user = userModel.unfollowUser(followerId, followedId);
        console.log(user);
        res.json(user);
        */

        var followerId = req.params.followerId;
        var followedId = req.params.followedId;


        userModelProj.unfollowByUser(followerId, followedId)
            .then(
                function ( docs ) {
                    return userModelProj.unfollowUser(followerId, followedId);
                },
                function ( err ) {
                    res.status(400).send(err);
                })
            .then(
                function ( user ) {
                    res.json(user);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    function getFollowedUsersForUser(req, res) {
        /*
        var followedUsers = req.body;
        var users = userModel.findFollowedUsersForUser(followedUsers);
        res.json(users);
        */

        var followedUsers = req.body;
        userModelProj.findFollowedUsersForUser(followedUsers)
            .then(
                function ( users ) {
                    res.json(users);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function uploadProfilePic (req,res){
        /*
        var userId = req.body.userId;
        var myFile = req.files.myFile;
        console.log(userId);
        console.log(myFile);

        var file = {
            path: myFile.path,
            name: myFile.name,  // TODO: change to unique name;
            size: myFile.size,
            type: myFile.type
        };
        */

        var userId = req.body.userId;
        var myFile = req.files.myFile;

        var file = {
            path: myFile.path,
            name: myFile.name,  // TODO: change to unique name;
            size: myFile.size,
            type: myFile.type
        };

        var saveFileNameArray = file.path.split('/');

        var saveFileName = saveFileNameArray[saveFileNameArray.length - 1];

        var savePath = "../../uploads/" + saveFileName;

        //console.log(savePath);

        // optionally rename the file to its original name
        var oldPath = path.resolve(myFile.path);
        var newPath = path.resolve(__dirname + "/../../../../public/uploads/" + saveFileName);

        //console.log(oldPath);
        //console.log(newPath);

        userModelProj.updateProfilePic(userId, savePath)
            .then(
                function ( doc ) {
                    mv(oldPath, newPath, function(err){
                        if(!err) {
                            res.redirect("/project/client/index.html#/profile_info");
                        } else {
                            res.status(400).send(err);
                        }
                    });
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function deleteProfilePic(req, res) {
        var userId = req.params.userId;
        var fileName = req.params.fileName;
        //console.log(fileName);
        userModelProj.updateProfilePic(userId, null)
            .then(
                function ( doc ) {
                    var thePath = path.resolve(__dirname + "/../../../../public/uploads/" + fileName);
                    fs.unlink(thePath, function(err){
                        if(!err) {
                            res.json({});
                        } else {
                            res.status(400).send(err);
                        }
                    });
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    // start configure middleware is Admin and authorized

    function isAdmin (req, res, next) {
        //console.log("checking admin");
        if (req.isAuthenticated()) {
            if (req.user.roles.indexOf('admin') >= 0 ) {
                //console.log("passed");
                next();
            } else {
                res.send(403);
            }
        } else {
            res.send(403);
        }
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    // finish configure middleware is Admin and authorized


};