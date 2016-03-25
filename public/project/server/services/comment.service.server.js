/**
 * Created by lixie on 16/3/23.
 */

module.exports = function(app, commentModel) {

    app.get("/api/project/comment", getAllComments);
    app.get("/api/project/user/:userId/comment", getAllCommentsForUser);
    app.get("/api/project/recipe/:recipeId/comment", getAllCommentsForRecipe);
    app.get("/api/project/comment/:commentId", getCommentById);
    app.delete("/api/project/comment/:commentId", deleteComment);
    app.post("/api/project/user/:userId/recipe/:recipeId/comment/", createNewCommentForUgetAllCommentsForUserser);
    app.put("/api/project/comment/:commentId", updateComment);

    function getAllComments(req, res) {
        var comments = recipeModel.findAllComments();
        res.json(comments);
    }

    function getAllCommentsForUser(req, res) {
        var userId = req.params.userId;
        var comments = recipeModel.findAllCommentsForUser(userId);
        res.json(comments);
    }

    function  getCommentById(req, res) {
        var commentId = req.params.commentId;
        var comment = recipeModel.findRecipeById(commentId);
        res.json(comment);
    }

    function deleteComment(req, res) {
        var commentId = req.params.commentId;
        var comments = recipeModel.deleteCommentById(commentId);
        res.json(comments);
    }

    function createNewCommentForUser(req, res) {
        var comment = req.body;
        var userId = req.params.userId;
        var recipeId = req.params.recipeId;
        var recipes = recipeModel.createCommentForUser(userId, recipeId, comment);
        res.json(recipes);
    }

    function updateComment(req, res) {
        var newComment = req.body;
        var commentId = req.params.commentId;
        var comments = recipeModel.updateCommentById(commentId, newComment);
        res.json(comments);
    }

};