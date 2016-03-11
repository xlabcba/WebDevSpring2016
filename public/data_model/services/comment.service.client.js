/**
 * Created by lixie on 16/3/9.
 */

(function(){
    angular
        .module("DataModelApp")
        .factory("CommentService", CommentService);

    function CommentService() {
        var parentComments = [];
        /*
        var childComments = [];
        */
        parentComments = [
            {
                "_id": "001", "userId": 234, "recipeId":"000", "child":["111", "222"], "title": "Recommend!!!",
                "rating": "5", "rateImg":"./images/star5.png",
                "content": "This recipe is really amazing. I love it!"
            },
            {
                "_id": "002", "userId": 234, "recipeId":"010", "child":[], "title": "This is what I want!",
                "rating": "4", "rateImg":"./images/star4.png",
                "content": "It is good! Highly recommended!"
            },
            {
                "_id": "003", "userId": 123, "recipeId":"020", "child":["333"], "title":"I love it!",
                "rating": "3", "rateImg":"./images/star3.png",
                "content":"Classic and Must try!"
            }
        ];

        /*
        childComments = [
            {
                "_id": "111", "userId": 123, "recipe":"000", "parent":"001", "title":"",
                "content":"Thank you!"
            },
            {
                "_id": "222", "userId": 234, "recipe":"000", "parent":"001", "title":"",
                "content": "Can you try Irish Car Bomb next time? And you can view my recipe, it is also good"
            },
            {
                "_id": "333", "userId": 234, "recipe": "020", "parent":"020", "title":"",
                "content":"Thank you!"
            }
        ];
        */

        var service = {
            findAllComments: findAllComments,
            findAllCommentsForUser: findAllCommentsForUser,
            findAllCommentsForRecipe: findAllCommentsForRecipe,
            createCommentForUser: createCommentForUser,
            deleteCommentById: deleteCommentById,
            updateCommentById: updateCommentById
        };

        return service;

        function createCommentForUser(userId, recipeId, comment, callback) {
            var d = new Date();
            var n = d.getTime();
            comment._id = n;
            comment.userId = userId;
            comment.recipeId = recipeId;
            parentComments.push(comment);
            callback(comment);
            return;

        }

        function findAllComments(callback) {
            callback(parentComments);
            return;
        }

        function findAllCommentsForUser(userId, callback) {
            var ret_comments = [];
            for(var i=0; i<parentComments.length; i++)
            {
                if(parentComments[i].userId === userId)
                {
                    ret_comments.push(parentComments[i]);
                }
            }
            callback(ret_comments);
            return;
        }

        function findAllCommentsForRecipe(recipeId, callback) {
            var ret_comments = [];
            for(var i=0; i<parentComments.length; i++)
            {
                if(parentComments[i].recipeId === recipeId)
                {
                    ret_comments.push(parentComments[i]);
                }
            }
            callback(ret_comments);
            return;
        }

        function deleteCommentById(commentId, callback) {
            for(var i=0; i<parentComments.length; i++)
            {
                if(parentComments[i]._id === commentId)
                {
                    parentComments.splice(i,1);
                    callback(parentComments);
                    break;
                }
            }
            return;
        }

        function updateCommentById(commentId, newComment, callback) {
            for(var i=0; i<parentComments.length; i++)
            {
                if(parentComments[i]._id === commentId)
                {
                    parentComments.splice(i,1,newComment);
                    callback(parentComments[i]);
                    break;
                }
            }
            return;
        }
    }
})();