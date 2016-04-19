/**
 * Created by lixie on 16/3/4.
 */

(function()
{
    angular
        .module("RecipeApp")
        .controller("RecipeController", RecipeController);

    function RecipeController($location, $rootScope, $routeParams, RecipeService, CommentService, UserService)
    {
        var vm = this;

        vm.isLoggedIn = isLoggedIn;
        vm.isAdminOrAuthor = isAdminOrAuthor;
        vm.isAuthor = isAuthor;
        vm.deleteComment = deleteComment;
        vm.setCurrComment = setCurrComment;
        vm.updateComment = updateComment;
        vm.postComment = postComment;
        vm.cannotFollow = cannotFollow;
        vm.canUnfollow = canUnfollow;
        vm.followRecipeAuthor = followRecipeAuthor;
        vm.unfollowRecipeAuthor = unfollowRecipeAuthor;
        vm.cannotAddToFavorite = cannotAddToFavorite;
        vm.canDeleteFromFavorite = canDeleteFromFavorite;
        vm.addRecipeToFavorite = addRecipeToFavorite;
        vm.deleteRecipeFromFavorite = deleteRecipeFromFavorite;
        vm.noPic = noPic;

        function init() {

            vm.currUser = UserService.getCurrentUser();
            vm.recipeId = $routeParams.recipeId;
            vm.imgIndexes = [];
            vm.currImgIndex = 0;
            vm.comments = [];
            // vm.usersOfComments = [];
            vm.currComment = {};
            vm.newComment = {};
            vm.recipeAuthor = {};

            //console.log(vm.currUser);

            RecipeService
                .getRecipeById(vm.recipeId)
                .then(function(response){
                    vm.recipe = response.data;
                    getAuthorOfRecipe();
                    for(var i in vm.recipe.recipeImg) {
                        vm.imgIndexes.push(i);
                    }
                    //console.log(vm.imgIndexes);
                });

            CommentService
                .findAllCommentsForRecipe(vm.recipeId)
                .then(function(response){
                    getUsersOfComments(response.data);
                });

        }
        init();

        function getAuthorOfRecipe() {
            UserService
                .findUserById(vm.recipe.userId)
                .then(function(response){
                    RecipeService
                        .findAllRecipesForUser(response.data._id)
                        .then(function(res){
                            response.data.recipeNumber = res.data.length;
                            vm.recipeAuthor = response.data;
                        });
                });
        }

        function getUsersOfComments(comments) {
            //console.log(comments);
            for (var c in comments) {
                (function() {
                    var i = c;
                    UserService
                        .findUserById(comments[i].userId)
                        .then(function(response) {
                            RecipeService
                                .findAllRecipesForUser(response.data._id)
                                .then(function(res){
                                    response.data.recipeNumber = res.data.length;
                                    comments[i].author = response.data;
                                });
                        });
                })();
            }
            vm.comments = comments;
        }

        function isLoggedIn() {
            return UserService.isLoggedIn();
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
                    //console.log(response.data);
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
            //console.log(vm.currComment);
        }

        function clearCurrComment() {
            vm.currComment = {};
        }

        function updateComment() {

            if (!vm.currComment.title) {
                alert("title cannot be empty!");
                return;
            }

            if (!vm.currComment.content) {
                alert("content cannot be empty!");
                return;
            }

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
                userId: vm.currComment.userId,
                recipeId: vm.currComment.recipeId,
                title: vm.currComment.title,
                rating: vm.currComment.rating,
                rateImg: vm.currComment.rateImg,
                content: vm.currComment.content,
                created: vm.currComment.created,
                updated: Date.now()
            };

            CommentService
                .updateCommentById(vm.currComment._id, newComment)
                .then(function(response){
                    init();
                })
        }

        function postComment(comment) {
            if (comment.title == undefined || comment.title == null) {
                alert("comment title is required!");
                return;
            }
            if (comment.rating == undefined || comment.rating == 0) {
                alert("please rate this recipe! (1 - 5 star(s))");
                return;
            }
            if (comment.content == undefined || comment.content == null) {
                alert("comment content is required!");
                return;
            }

            if (comment.rating == "5") {
                comment.rateImg = "./images/star5.png";
            } else if (comment.rating == "4") {
                comment.rateImg = "./images/star4.png";
            } else if (comment.rating == "3") {
                comment.rateImg = "./images/star3.png";
            } else if (comment.rating == "2") {
                comment.rateImg = "./images/star2.png";
            } else if (comment.rating == "1") {
                comment.rateImg = "./images/star1.png";
            } else {
                comment.rateImg = "./images/star0.png";
            }

            var newComment = {
                userId: vm.currUser._id,
                recipeId: vm.recipeId,
                title: comment.title,
                rating: comment.rating,
                rateImg: comment.rateImg,
                content: comment.content
            };

            CommentService
                .createCommentForUser(vm.currUser._id, vm.recipeId, newComment)
                .then(function(response){
                    init();
                });

        }

        function cannotFollow() {
            return (!UserService.isLoggedIn() // not loggedIn
            || UserService.isMe(vm.recipeAuthor._id) // OR is recipe author
            || (vm.currUser.follow.indexOf(vm.recipeAuthor._id) >= 0)); // OR has followed this author
        }

        function canUnfollow() {
            return (UserService.isLoggedIn() // loggedIn
            && (vm.currUser.follow.indexOf(vm.recipeAuthor._id) >= 0)); // AND has followed this author
        }

        function followRecipeAuthor(followerId, followedId) {
            UserService
                .followUser(followerId, followedId)
                .then(
                    function(response){
                        setUser(followerId);
                    },
                    function(err){
                        vm.error = err;
                    });
        }

        function unfollowRecipeAuthor(followerId, followedId) {
            UserService
                .unfollowUser(followerId, followedId)
                .then(
                    function(response){
                        setUser(followerId);
                    },
                    function(err){
                        vm.error = err;
                    });
        }

        function cannotAddToFavorite() {
            return (!UserService.isLoggedIn() // not loggedIn
            || (vm.currUser.like.indexOf(vm.recipeId) >= 0)); // OR has likee this recipe
        }

        function canDeleteFromFavorite() {
            return (UserService.isLoggedIn() // loggedIn
            && (vm.currUser.like.indexOf(vm.recipeId) >= 0)); // AND has liked this recipe
        }

        function addRecipeToFavorite(userId, recipeId) {
            RecipeService
                .userLikesRecipe(userId, recipeId)
                .then(
                    function(response){
                        setUser(userId);
                    },
                    function(err){
                        vm.error = err;
                    });
        }

        function deleteRecipeFromFavorite(userId, recipeId) {
            RecipeService
                .userUnlikesRecipe(userId, recipeId)
                .then(
                    function(response){
                        setUser(userId);
                    },
                    function(err){
                        vm.error = err;
                    });
        }

        function setUser(userId) {
            UserService
                .findUserById(userId)
                .then(
                    function(response){
                        UserService.setCurrentUser(response.data);
                        init();
                    },
                    function(err){
                        vm.error = err;
                    });
        }

        function noPic(pic) {
            return (pic == null || pic == undefined || pic.length == 0);
        }

    }
})();