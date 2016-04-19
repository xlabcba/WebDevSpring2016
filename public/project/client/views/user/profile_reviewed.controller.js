/**
 * Created by lixie on 16/3/4.
 */

(function()
{
    angular
        .module("RecipeApp")
        .controller("ReviewedController", ReviewedController);

    function ReviewedController($rootScope, $scope, $location, UserService, CommentService, RecipeService)
    {
        /*onfocus="this.value = 'Awesome!';" onblur="if (this.value == '') {this.value = 'Awesome!';}"*/

        var vm = this;

        vm.deleteComment = deleteComment;
        vm.updateComment = updateComment;

        function init() {
            vm.currUser = UserService.getCurrentUser();

            CommentService
                .findAllCommentsForUser(vm.currUser._id)
                .then(function(response){
                    for(var c in response.data) {
                        (function() {
                            var i = c;
                            RecipeService
                                .getRecipeById(response.data[i].recipeId)
                                .then(function(res){
                                    response.data[i].recipeTitle = res.data.title;
                                    if (!noPic(res.data.recipeImg)) {
                                        response.data[i].recipeImg = res.data.recipeImg[0];
                                    } else {
                                        response.data[i].recipeImg = "./images/cocktail.jpg";
                                    }
                                });
                        })();

                    }
                    vm.comments = response.data;
                });
        }
        init();

        function deleteComment(comment) {
            CommentService
                .deleteCommentById(comment._id)
                .then(function(response){
                    init();
                });
        }

        function updateComment(comment) {

            if (!comment.title) {
                alert("Title cannot be empty!");
                return;
            }
            if (!comment.content) {
                alert("Content cannot be empty!");
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
                userId: comment.userId,
                recipeId: comment.recipeId,
                title: comment.title,
                rating: comment.rating,
                rateImg: comment.rateImg,
                content: comment.content,
                created: comment.created,
                updated: Date.now()
            };

            CommentService
                .updateCommentById(comment._id, newComment)
                .then(function(response){
                    init();
                })
        }

        function noPic(pic) {
            return (pic == null || pic == undefined || pic.length == 0);
        }

    }

})();