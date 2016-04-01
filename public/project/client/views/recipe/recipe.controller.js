/**
 * Created by lixie on 16/3/4.
 */

(function()
{
    angular
        .module("RecipeApp")
        .controller("RecipeController", RecipeController);

    function RecipeController($scope, $rootScope, $routeParams, RecipeService, CommentService, UserService)
    {
        var vm = this;

        vm.isAdminOrAuthor = isAdminOrAuthor;
        vm.isAuthor = isAuthor;
        vm.deleteComment = deleteComment;
        vm.setCurrComment = setCurrComment;
        vm.updateComment = updateComment;

        function init() {

            vm.currUser = $rootScope.currentUser;
            vm.recipeId = $routeParams.recipeId;
            vm.imgIndexes = [];
            vm.currImgIndex = 0;
            vm.comments = [];
            vm.usersOfComments = [];
            vm.currComment={};

            RecipeService
                .getRecipeById(vm.recipeId)
                .then(function(response){
                    vm.recipe = response.data;
                    for(var i in vm.recipe.recipeImg) {
                        vm.imgIndexes.push(i);
                    }
                    getCommentOfRecipe(vm.recipeId);
                });
        }
        init();

        function getCommentOfRecipe(recipeId) {
            CommentService
                .findAllCommentsForRecipe(recipeId)
                .then(function(response){
                   vm.comments = response.data;
                    getUsersOfComments();
                });
        }

        function getUsersOfComments() {
            for (var c in vm.comments) {
                (function() {
                    var i = c;
                    UserService
                        .findUserById(vm.comments[i].userId)
                        .then(function(response) {
                            RecipeService
                                .findAllRecipesForUser(response.data._id)
                                .then(function(res){
                                    response.data.recipeNumber = res.data.length;
                                    vm.usersOfComments.push(response.data);
                                });
                        });
                })();
            }
        }

        function isAdminOrAuthor(authorId) {
            return (UserService.isAdmin() || UserService.isMe(authorId));
        }

        function isAuthor(authorId) {
            return UserService.isMe(authorId);
        }

        function deleteComment(comment) {
            CommentService
                .deleteCommentById(comment._id)
                .then(function(response){
                    console.log(response.data);
                    init();
                });
        }

        function setCurrComment(comment) {
            vm.currComment = {
                _id: comment._id,
                userId: comment.userId,
                recipeId: comment.recipeId,
                title: comment.title,
                rating: comment.rating,
                rateImg: comment.rateImg,
                content: comment.content
            };
            console.log(vm.currComment);
        }

        function clearCurrComment() {
            vm.currComment = {};
        }

        function updateComment() {

            if (vm.currComment.rating == "5") {
                vm.currComment.rateImg = "./images/star5.png";
            } else if (vm.currComment.rating == "4") {
                vm.currComment.rateImg = "./images/star4.png";
            } else if (vm.currComment.rating == "3") {
                vm.currComment.rateImg = "./images/star3.png";
            } else if (vm.currComment.rating == "2") {
                vm.currComment.rateImg = "./images/star2.png";
            } else if (vm.currComment.rating == "1") {
                vm.currComment.rateImg = "./images/star1.png";
            } else {
                vm.currComment.rateImg = "./images/star0.png";
            }

            var newComment = {
                _id: vm.currComment._id,
                userId: vm.currComment.userId,
                recipeId: vm.currComment.recipeId,
                title: vm.currComment.title,
                rating: vm.currComment.rating,
                rateImg: vm.currComment.rateImg,
                content: vm.currComment.content
            };

            CommentService
                .updateCommentById(newComment._id, newComment)
                .then(function(response){
                    init();
                })
        }


    }
})();