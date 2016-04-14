var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt           = require("bcrypt-nodejs");

module.exports = function(app, userModel) {

    var auth = authorized;
    var isAd = isAdmin;

    app.post  ("/api/assignment/login", passport.authenticate('local'), login);
    app.get   ("/api/assignment/loggedin",       loggedin);
    app.post  ("/api/assignment/logout",         logout);
    app.post  ("/api/assignment/register",       register);

    app.post  ("/api/assignment/admin/user", isAdmin, creatUserByAdmin);
    app.get   ("/api/assignment/admin/user", isAdmin, getUser);
    app.get   ("/api/assignment/admin/user/:userId", isAdmin, getUserById);
    app.delete("/api/assignment/admin/user/:userId", isAdmin, deleteUserById);
    app.put   ("/api/assignment/admin/user/:userId", isAdmin, updateUserById);

    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", getUser);
    //app.get("/api/assignment/user?username=username", getUser);
    //app.get("/api/assignment/user?username=username&password=password", getUser);
    app.get("/api/assignment/user/:id", getUserById);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        console.log(username);
        console.log(password);
        // lookup user by username only. cant compare password since it's encrypted
        userModel
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

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
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

    function creatUserByAdmin(req, res) {
        var newUser = req.body;

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        // encrypt the password when registering
                        newUser.password = bcrypt.hashSync(newUser.password);
                        userModel
                            .createUser(newUser)
                            .then(
                                // login user if promise resolved
                                function ( user ) {
                                    //req.session.currentUser = doc;
                                    res.json(user);
                                },
                                // send error if promise rejected
                                function ( err ) {
                                    res.status(400).send(err);
                                }
                            )
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }



    function register(req, res) {
        /*
        var user = req.body;
        var currUser = userModel.createUser(user);
        console.log("returned");
        console.log(currUser);
        //req.session.currentUser = user;
        res.json(currUser);
        */

        /*
        var user = req.body;

        userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( user ) {
                    //req.session.currentUser = doc;
                    res.json(user);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
            */

        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        // encrypt the password when registering
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getUser(req, res) {
        if (Object.keys(req.query).length === 0) {
            userModel.findAllUsers()
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
            userModel.findUserByUsername(username)
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
            userModel.findUserByCredentials(credentials)
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
        userModel.findUserById(userId)
            .then(
                function ( user ) {
                    res.json(user)
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        if (!userId || userId == undefined) {
            userId = req.params.userId;
        }
        var newUser = req.body;
        console.log("password check before update profile");
        console.log(userId);
        console.log(newUser);
        userModel
            .findUserById(userId)
            .then(
                function(user){
                    console.log(user);
                    if (user.password != newUser.password) {
                        newUser.password = bcrypt.hashSync(newUser.password);
                    }
                    console.log(newUser);
                    userModel
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

    function deleteUserById(req, res) {
        var userId = req.params.id;
        if (!userId || userId == undefined) {
            userId = req.params.userId;
        }
        userModel.deleteUserById(userId)
            .then(
                function ( stats ) {
                    res.send(200);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function isAdmin (req, res, next) {
        console.log("checking admin");
        if (req.isAuthenticated()) {
            if (req.user.roles.indexOf('admin') >= 0 ) {
                console.log("passed");
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

};