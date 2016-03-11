/**
 * Created by lixie on 16/3/4.
 */

(function() {
    angular
        .module("DataModelApp")
        .controller("CommentController", CommentController);

    function CommentController($scope, $rootScope, $location, CommentService) {

        //var stepStr;
        var currUser = $rootScope.currUser;
        var currRecipe = $rootScope.currRecipe;
        var selectedCommentIndex = -1;
        $scope.newComment = {"_id":0, "userId":0, "recipeId":0, "title":"", "rating":"", "rateImg":"", "content":""};


        $scope.parentComments = [];
        CommentService.findAllComments(function (parentComments) {
            $scope.parentComments = parentComments;
        });

        $scope.createComment = function(){

            if (!$scope.newComment.title) {
                alert("Title is Required!");
                return;
            }
            if (!$scope.newComment.content) {
                alert("Content cannot be empty!");
                return;
            }

            if ($scope.newComment.rating === "5") {
                $scope.newComment.rateImg = "./images/star5.png";
            } else if ($scope.newComment.rating === "4") {
                $scope.newComment.rateImg = "./images/star4.png";
            } else if ($scope.newComment.rating === "3") {
                $scope.newComment.rateImg = "./images/star3.png";
            } else if ($scope.newComment.rating === "2") {
                $scope.newComment.rateImg = "./images/star2.png";
            } else if ($scope.newComment.rating === "1") {
                $scope.newComment.rateImg = "./images/star1.png";
            } else {
                $scope.newComment.rateImg = "./images/star0.png";
            }

            var newComment =
            {   "_id":0,
                "userId": $scope.currUser._id,
                "recipeId": $scope.currRecipe._id,
                "title": $scope.newComment.title,
                "rating": $scope.newComment.rating,
                "rateImg": $scope.newComment.rateImg,
                "content": $scope.newComment.content
            };

            CommentService.createCommentForUser($scope.currUser._id, $scope.currRecipe._id, newComment, function(comment) {
                CommentService.findAllComments(function (parentComments) {
                    $scope.parentComments = parentComments;
                });
                $scope.newComment = {"_id":0, "userId":0, "recipeId":0, "title":"", "rating":"", "rateImg":"", "content":""};
                selectedCommentIndex = -1;
            });
        };

        $scope.selectComment = function(index){
            selectedCommentIndex = index;

            $scope.newComment =
            {   "_id": $scope.parentComments[selectedCommentIndex]._id,
                "userId": $scope.parentComments[selectedCommentIndex].userId,
                "recipeId": $scope.parentComments[selectedCommentIndex].recipeId,
                "title": $scope.parentComments[selectedCommentIndex].title,
                "rating": $scope.parentComments[selectedCommentIndex].rating,
                "rateImg": $scope.parentComments[selectedCommentIndex].rateImg,
                "content": $scope.parentComments[selectedCommentIndex].content
            };
        };

        $scope.updateComment = function(){
            if (selectedCommentIndex >= 0) {
                if (!$scope.newComment.title) {
                    alert("Title is Required!");
                    return;
                }
                if (!$scope.newComment.content) {
                    alert("Content cannot be empty!");
                    return;
                }

                if ($scope.newComment.rating === "5") {
                    $scope.newComment.rateImg = "./images/star5.png";
                } else if ($scope.newComment.rating === "4") {
                    $scope.newComment.rateImg = "./images/star4.png";
                } else if ($scope.newComment.rating === "3") {
                    $scope.newComment.rateImg = "./images/star3.png";
                } else if ($scope.newComment.rating === "2") {
                    $scope.newComment.rateImg = "./images/star2.png";
                } else if ($scope.newComment.rating === "1") {
                    $scope.newComment.rateImg = "./images/star1.png";
                } else {
                    $scope.newComment.rateImg = "./images/star0.png";
                }

                var newComment =
                {   "_id": $scope.newComment._id,
                    "userId": $scope.newComment.userId,
                    "recipeId": $scope.newComment.recipeId,
                    "title": $scope.newComment.title,
                    "rating": $scope.newComment.rating,
                    "rateImg": $scope.newComment.rateImg,
                    "content": $scope.newComment.content
                };

                CommentService.updateCommentById(newComment._id, newComment, function(comment) {
                    CommentService.findAllComments(function (parentComments) {
                        $scope.parentComments = parentComments;
                    });
                    $scope.newComment = {"_id":0, "userId":0, "recipeId":0, "title":"", "rating":"", "rateImg":"", "content":""};
                    selectedCommentIndex = -1;
                });
            }
        };

        $scope.deleteComment = function (index) {

            var delComment =
            {   "_id": $scope.parentComments[index]._id,
                "userId": $scope.parentComments[index].userId,
                "recipeId": $scope.parentComments[index].recipeId,
                "title": $scope.parentComments[index].title,
                "rating": $scope.parentComments[index].rating,
                "rateImg": $scope.parentComments[index].rateImg,
                "content": $scope.parentComments[index].content,
            };

            CommentService.deleteCommentById(delComment._id, function(comments) {
                $scope.newComment = {"_id":0, "userId":0, "recipeId":0, "title":"", "rating":"", "rateImg":"", "content":""};
                CommentService.findAllComments(function (parentComments) {
                    $scope.parentComments = parentComments;
                });
            });
        };

    }
})();