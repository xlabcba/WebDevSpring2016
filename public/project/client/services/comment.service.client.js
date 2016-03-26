(function(){
    angular
        .module("RecipeApp")
        .factory("CommentService", CommentService);

    function CommentService($http) {

        var service = {
            createCommentForUser: createCommentForUser,
            findAllComments: findAllComments,
            findAllCommentsForUser: findAllCommentsForUser,
            findAllCommentsForRecipe: findAllCommentsForRecipe,
            findCommentById: findCommentById,
            deleteCommentById: deleteCommentById,
            updateCommentById: updateCommentById
        };

        return service;

        function createCommentForUser(userId, recipeId, comment) {
            return $http.post("/api/project/user/"+userId+"/recipe/"+recipeId+"/comment/", comment);
        }

        function findAllComments() {
            return $http.get("/api/project/comment");

        }

        function findAllCommentsForUser(userId) {
            return $http.get("/api/project/user/"+userId+"/comment");
        }

        function findAllCommentsForRecipe(recipeId) {
            return $http.get("/api/project/recipe/"+recipeId+"/comment");
        }

        function findCommentById(commentId) {
            return $http.get("/api/project/comment/"+commentId);
        }

        function deleteCommentById(commentId) {
            return $http.delete("/api/project/comment/"+commentId);
        }

        function updateCommentById(commentId, newComment) {
            return $http.put("/api/project/comment/"+commentId, newComment);
        }

    }
})();