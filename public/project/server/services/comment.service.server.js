/**
 * Created by lixie on 16/3/23.
 */

module.exports = function(app, userModelProj, recipeModel, commentModel) {

    app.get("/api/project/comment", getAllComments);
    app.get("/api/project/user/:userId/comment", getAllCommentsForUser);
    app.get("/api/project/recipe/:recipeId/comment", getAllCommentsForRecipe);
    app.get("/api/project/comment/:commentId", getCommentById);
    app.delete("/api/project/comment/:commentId", deleteComment);
    app.post("/api/project/comment/user/:userId/recipe/:recipeId", createNewCommentForUser);
    app.put("/api/project/comment/:commentId", updateComment);

    function getAllComments(req, res) {
        /*
        var comments = commentModel.findAllComments();
        res.json(comments);
        */

        commentModel.findAllComments
            .then(
                function ( docs ) {
                    res.json(docs);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function getAllCommentsForUser(req, res) {
        /*
        var userId = req.params.userId;
        var comments = commentModel.findAllCommentsForUser(userId);
        res.json(comments);
        */

        var userId = req.params.userId;

        commentModel.findAllCommentsForUser(userId)
            .then(
                function ( docs ) {
                    res.json(docs);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function getAllCommentsForRecipe(req, res) {
        /*
        var recipeId = req.params.recipeId;
        var comments = commentModel.findAllCommentsForRecipe(recipeId);
        res.json(comments);
        */

        var recipeId = req.params.recipeId;

        commentModel.findAllCommentsForRecipe(recipeId)
            .then(
                function ( docs ) {
                    res.json(docs);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function  getCommentById(req, res) {
        /*
        var commentId = req.params.commentId;
        var comment = commentModel.findRecipeById(commentId);
        res.json(comment);
        */

        var commentId = req.params.commentId;

        commentModel.findRecipeById(commentId)
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function deleteComment(req, res) {
        /*
        var commentId = req.params.commentId;
        var comments = commentModel.deleteCommentById(commentId);
        res.json(comments);
        */

        var commentId = req.params.commentId;

        //console.log("deleting comment in server client");
        //console.log(commentId);

        commentModel.deleteCommentById(commentId)
            .then(
                function ( comment ) {
                    //console.log(comment);
                    return commentModel.calculateRatingForRecipe(comment.recipeId);
                },
                function ( err ) {
                    res.status(400).send(err);
                })
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                })

    }

    function createNewCommentForUser(req, res) {
        /*
        var comment = req.body;
        var userId = req.params.userId;
        var recipeId = req.params.recipeId;
        var recipes = commentModel.createCommentForUser(userId, recipeId, comment);
        res.json(recipes);
        */

        var comment = req.body;
        var userId = req.params.userId;
        var recipeId = req.params.recipeId;

        //console.log(comment);
        //console.log(userId);
        //console.log(recipeId);

        commentModel.createCommentForUser(userId, recipeId, comment)
            .then(
                function ( doc ) {
                    //console.log(doc);
                    return commentModel.calculateRatingForRecipe(recipeId);
                },
                function ( err ) {
                    res.status(400).send(err);
                })
            .then(
                function ( doc ) {
                    //console.log(doc);
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function updateComment(req, res) {
        /*
        var newComment = req.body;
        var commentId = req.params.commentId;
        var comments = commentModel.updateCommentById(commentId, newComment);
        res.json(comments);
        */

        var newComment = req.body;
        var commentId = req.params.commentId;

        commentModel.updateCommentById(commentId, newComment)
            .then(
                function ( stats ) {
                    return commentModel.calculateRatingForRecipe(newComment.recipeId);
                },
                function ( err ) {
                    res.status(400).send(err);
                })
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

};