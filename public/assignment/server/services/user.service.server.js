module.exports = function(app, userModel) {

    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", getUser);
    //app.get("/api/assignment/user?username=username", getUser);
    //app.get("/api/assignment/user?username=username&password=password", getUser);
    app.get("/api/assignment/user/:id", getUserById);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function register(req, res) {
        /*
        var user = req.body;
        var currUser = userModel.createUser(user);
        console.log("returned");
        console.log(currUser);
        //req.session.currentUser = user;
        res.json(currUser);
        */

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
        var newUser = req.body;
        userModel.updateUserById(userId, newUser)
            .then(
                function ( stats ) {
                    res.send(200);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
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

};