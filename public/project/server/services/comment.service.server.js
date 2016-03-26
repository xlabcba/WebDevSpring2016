/**
 * Created by lixie on 16/3/23.
 */

module.exports = function(app, userModel, recipeModel, commentModel) {

    app.get("/api/project/comment", getAllComments);
    app.get("/api/project/user/:userId/comment", getAllCommentsForUser);
    app.get("/api/project/recipe/:recipeId/comment", getAllCommentsForRecipe);
    app.get("/api/project/comment/:commentId", getCommentById);
    app.delete("/api/project/comment/:commentId", deleteComment);
    app.post("/api/project/user/:userId/recipe/:recipeId/comment/", createNewCommentForUser);
    app.put("/api/project/comment/:commentId", updateComment);

    function getAllComments(req, res) {
        var comments = commentModel.findAllComments();
        res.json(comments);
    }

    function getAllCommentsForUser(req, res) {
        var userId = req.params.userId;
        var comments = commentModel.findAllCommentsForUser(userId);
        res.json(comments);
    }

    function getAllCommentsForRecipe(req, res) {
        var recipeId = req.params.recipeId;
        var comments = commentModel.findAllCommentsForRecipe(recipeId);
        res.json(comments);
    }

    function  getCommentById(req, res) {
        var commentId = req.params.commentId;
        var comment = commentModel.findRecipeById(commentId);
        res.json(comment);
    }

    function deleteComment(req, res) {
        var commentId = req.params.commentId;
        var comments = commentModel.deleteCommentById(commentId);
        res.json(comments);
    }

    function createNewCommentForUser(req, res) {
        var comment = req.body;
        var userId = req.params.userId;
        var recipeId = req.params.recipeId;
        var recipes = commentModel.createCommentForUser(userId, recipeId, comment);
        res.json(recipes);
    }

    function updateComment(req, res) {
        var newComment = req.body;
        var commentId = req.params.commentId;
        var comments = commentModel.updateCommentById(commentId, newComment);
        res.json(comments);
    }

};