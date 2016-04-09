/**
 * Created by lixie on 16/3/23.
 */

module.exports = function(app, userModel, recipeModel, commentModel) {

    app.post("/api/project/user", createNewUser);
    app.get("/api/project/user", getUser);
    app.get("/api/project/user/:id", getUserById);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);
    app.post("/api/project/user/:followerId/user/:followedId", userFollowsUser);
    app.put("/api/project/user/:followerId/user/:followedId", userUnfollowsUser);
    app.post("/api/project/user/searchFollowedUsers", getFollowedUsersForUser);
    app.post("/api/project/user/photo", uploadPhotoForUserById);
    app.get("/api/project/user/photo", getPhotoForUserById);

    files = [];

    function createNewUser(req, res) {
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
        recipeModel.deleteRecipeOfUser(userId);
        commentModel.deleteCommentOfUser(userId);
        userModel.deleteUserFromFollower(userId);
        recipeModel.deleteUserFromLikeBy(userId);
        var users = userModel.deleteUserById(userId);
        res.json(users);
    }

    function userFollowsUser(req, res) {
        var followerId = req.params.followerId;
        var followedId = req.params.followedId;
        userModel.followByUser(followerId, followedId);
        var user = userModel.followUser(followerId, followedId);
        res.json(user);
    }

    function userUnfollowsUser(req, res) {
        var followerId = req.params.followerId;
        var followedId = req.params.followedId;
        console.log(followerId);
        console.log(followedId);
        userModel.unfollowByUser(followerId, followedId);
        var user = userModel.unfollowUser(followerId, followedId);
        console.log(user);
        res.json(user);
    }

    function getFollowedUsersForUser(req, res) {
        var followedUsers = req.body;
        var users = userModel.findFollowedUsersForUser(followedUsers);
        res.json(users);
    }

    function uploadPhotoForUserById(req, res) {
        console.log('body: ' + JSON.stringify(req));
        /*
        var myFile = req.files.myFile;

        var file = {
            path: myFile.path,
            name: myFile.name,
            size: myFile.size,
            type: myFile.type
        };

        // optionally rename the file to its original name
        var oldPath = __dirname + "/../../" + myFile.path;
        var newPath = __dirname + "/../../public/uploads/" + myFile.name;
        files.push(file);
        res.json(files);
        /*
        res.redirect("/experiments/upload/file-list.view.html");
        */
        res.json(null);
    }

    function getPhotoForUserById(req, res) {
        res.json(files);
    }

};