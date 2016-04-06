/**
 * Created by lixie on 16/3/24.
 */

// load mock forms data
var mock = require("./comment.mock.json");
var Guid = require("../js/guid.js");

module.exports = function(recipeModel) {

    var api = {

        createCommentForUser: createCommentForUser,
        findAllComments: findAllComments,
        findAllCommentsForUser: findAllCommentsForUser,
        findAllCommentsForRecipe: findAllCommentsForRecipe,
        findCommentById: findCommentById,
        deleteCommentById: deleteCommentById,
        updateCommentById: updateCommentById,
        deleteCommentOfRecipe: deleteCommentOfRecipe,
        deleteCommentOfUser: deleteCommentOfUser,
        calculateRating: calculateRating

    };
    return api;

    function createCommentForUser(userId, recipeId, comment) {
        var newComment = {
            _id: Guid.create(), //"ID_" + (new Date()).getTime(),
            userId: userId,
            recipeId: recipeId,
            title: comment.title,
            rating: comment.rating,
            rateImg: comment.rateImg,
            content: comment.content
        };
        mock.push(newComment);
        var rating = calculateRating(recipeId);
        recipeModel.updateRating(recipeId, rating);
        return mock;
    }

    function findAllComments() {
        return mock;
    }

    function findAllCommentsForUser(userId) {
        var ret_comments = [];
        for(var c in mock) {
            if(mock[c].userId == userId) {
                ret_comments.push(mock[c]);
            }
        }
        return ret_comments;
    }

    function findAllCommentsForRecipe(recipeId) {
        var ret_comments = [];
        for(var c in mock) {
            if(mock[c].recipeId == recipeId) {
                ret_comments.push(mock[c]);
            }
        }
        return ret_comments;
    }

    function findCommentById(commentId) {
        for(var c in mock) {
            if(mock[c]._id == commentId) {
                return mock[c];
            }
        }
        return null;
    }

    function deleteCommentById(commentId) {
        for(var c in mock) {
            if(mock[c]._id == commentId) {
                var recipeId = mock[c].recipeId;
                mock.splice(c,1);
                var newRating = calculateRating(recipeId);
                recipeModel.updateRating(recipeId, newRating);
                return mock;
            }
        }
        return null;
    }

    function updateCommentById(commentId, newComment) {
        for(var c in mock) {
            if(mock[c]._id == commentId) {
                mock.splice(c,1,newComment);
                var newRating = calculateRating(newComment.recipeId);
                recipeModel.updateRating(newComment.recipeId, newRating);
                return mock;
            }
        }
        return null;
    }

    function deleteCommentOfRecipe(recipeId) {
        for(var c in mock) {
            if(mock[c].recipeId == recipeId) {
                mock.splice(c,1);
            }
        }
        var newRating = calculateRating(recipeId);
        recipeModel.updateRating(recipeId, newRating);
        console.log("deleted comment!");
        return 1;
    }

    function deleteCommentOfUser(userId) {
        for(var c in mock) {
            if(mock[c].userId == userId) {
                deleteCommentById(mock[c]._id);
            }
        }
        return 1;
    }

    function calculateRating(recipeId) {
        var sum = 0;
        var count = 0;
        var rating = 0;
        for(var c in mock) {
            if(mock[c].recipeId == recipeId) {
                console.log(recipeId);
                console.log(mock[c].rating);
                sum = sum + parseInt(mock[c].rating);
                count = count + 1;
                console.log(sum);
                console.log(count);
            }
        }
        rating = Math.round(sum / count);
        return rating;
    }

};