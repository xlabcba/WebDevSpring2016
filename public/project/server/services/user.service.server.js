/**
 * Created by lixie on 16/3/23.
 */

module.exports = function(app, userModel) {

    app.post("/api/project/user", createNewUser);
    app.get("/api/project/user", getUser);
    app.get("/api/project/user/:id", getUserById);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);
    app.post("/api/project/user/:followerId/user/:followedId", userFollowsUser);


    function createNewUser(req, res) {
        var user = req.body;
        var users = userModel.createUser(user);
        //req.session.currentUser = user;
        res.json(users);
    }

    function getUser(req, res) {
        console.log("I'm here!");
        if (Object.keys(req.query).length === 0) {
            var users = userModel.findAllUsers();
            res.json(users);
        } else if (Object.keys(req.query).length === 1) {
            var username = req.query.username;
            var user = userModel.findUserByUsername(username);
            res.json(user);
        } else if (Object.keys(req.query).length === 2) {
            console.log("Right if!");
            var username = req.query.username;
            var password = req.query.password;
            var user = userModel.findUserByCredentials(username, password);
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

    function updateUser(req, res) {
        var userId = req.params.id;
        var newUser = req.body;
        var users = userModel.updateUserById(userId, newUser);
        res.json(users);
    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        var users = userModel.deleteUserById(userId);
        res.json(users);
    }

    function userFollowsUser(req, res) {
        var followerId = req.params.followerId;
        var followedId = req.params.followedId;
        userModel
            .followByUser(followerId, followedId)
            .then(function(response){
                if (response == null) {
                    res.json(null);
                } else {
                    return userModel.followUser(followerId, followedId);
                }
            })
            .then(function(response){
                res.json(response);
            });
    }
};