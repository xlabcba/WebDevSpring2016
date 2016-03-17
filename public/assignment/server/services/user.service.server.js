module.exports = function(app, userModel) {

    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", getUser);
    //app.get("/api/assignment/user?username=username", getUser);
    //app.get("/api/assignment/user?username=username&password=password", getUser);
    app.get("/api/assignment/user/:id", getUserById);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function register(req, res) {
        var user = req.body;
        var users = userModel.createUser(user);
        //req.session.currentUser = user;
        res.json(users);
    }

    function getUser(req, res) {
        if (Object.keys(req.query).length === 0) {
            var users = userModel.findAllUsers();
            res.json(users);
        } else if (Object.keys(req.query).length === 1) {
            var username = req.query.username;
            var user = userModel.findUserByUsername(username);
            res.json(user);
        } else if (Object.keys(req.query).length === 2) {
            var username = req.query.username;
            var password = req.query.password;
            var credentials = {"username": username, "password": password};
            var user = userModel.findUserByCredentials(credentials);
            res.json(user);
        } else {
            res.json(null);
        }
    }

    function getUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function updateUserById(req, res) {
        var userId = req.params.id;
        var newUser = req.body;
        var users = userModel.updateUserById(userId, newUser);
        res.json(users);
    }

    function deleteUserById(req, res) {
        var userId = req.params.id;
        var users = userModel.deleteUserById(userId);
        res.json(users);
    }

};