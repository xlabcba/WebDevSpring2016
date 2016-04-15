/**
 * Created by lixie on 16/3/23.
 */

module.exports = function(app, fs, path, userModel, recipeModel, commentModel) {

    //var files = [];

    app.post("/api/project/user", createNewUser);
    app.get("/api/project/user", getUser);
    app.get("/api/project/user/:id", getUserById);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);
    app.post("/api/project/user/:followerId/user/:followedId", userFollowsUser);
    app.put("/api/project/user/:followerId/user/:followedId", userUnfollowsUser);
    app.post("/api/project/user/searchFollowedUsers", getFollowedUsersForUser);
    app.post("/api/project/profile/upload", uploadProfilePic);
    //app.get("/api/project/profile_pic_upload", getProfilePic);
    app.post("/api/project/profile/:userId/delete/:fileName", deleteProfilePic);

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

    function uploadProfilePic (req,res){
        var userId = req.body.userId;
        var myFile = req.files.myFile;
        console.log(userId);
        console.log(myFile);

        var file = {
            path: myFile.path,
            name: myFile.name,
            size: myFile.size,
            type: myFile.type
        };

        var savePath = "../../uploads/" + file.name;

        console.log(savePath);

        // optionally rename the file to its original name
        var oldPath = path.resolve(myFile.path);
        var newPath = path.resolve(__dirname + "/../../../../public/uploads/" + myFile.name);

        console.log(oldPath);
        console.log(newPath);

        fs.rename(oldPath, newPath);

        userModel.updateProfilePic(userId, savePath);
        res.location("/project/client/index.html#/profile_info");  //TODO: change to redirect

    }

    /*
    function getProfilePic(req,res) {
        console.log("Here!!!");
        res.json(files);
    }
    */

    function deleteProfilePic(req, res) {
        var userId = req.params.userId;
        var fileName = req.params.fileName;
        console.log(fileName);
        userModel.updateProfilePic(userId, null);
        var thePath = path.resolve(__dirname + "/../../../../public/uploads/" + fileName);
        fs.unlink(thePath);
        res.json({});
    }

};