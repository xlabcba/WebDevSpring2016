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

        user = userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {
                    //req.session.currentUser = doc;
                    console.log(doc);
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function getUser(req, res) {
        if (Object.keys(req.query).length === 0) {
            var users = userModel.findAllUsers()
                .then(
                    function ( doc ) {
                        res.json(doc);
                    },
                    function ( err ) {
                        res.status(400).send(err);
                    }
                );
        } else if (Object.keys(req.query).length === 1) {
            var username = req.query.username;
            var user = userModel.findUserByUsername(username)
                .then(
                    function ( doc ) {
                        res.json(doc);
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
            var user = userModel.findUserByCredentials(credentials)
                .then(
                    function ( doc ) {
                        res.json(doc);
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
        var user = userModel.findUserById(userId)
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var newUser = req.body;
        var users = userModel.updateUserById(userId, newUser)
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        var users = userModel.deleteUserById(userId)
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

};