/**
 * Created by lixie on 16/3/4.
 */

(function() {
    angular
        .module("DataModelApp")
        .controller("RecipeController", RecipeController);

    function RecipeController($scope, $rootScope, $location, RecipeService) {

        //var stepStr;
        var currUser = $rootScope.currUser;
        var selectedRecipeIndex = -1;
        $scope.newRecipe = {"_id":0, "userId":0, "title":"", "tag1":"", "tag2":"", "tag3":"",
            "ingredientSpirit":"", "ingredientOther":"", "step":"", "user":"", "comment":[]};


        $scope.recipes = [];
        RecipeService.findAllRecipes(function (recipes) {
            $scope.recipes = recipes;
        });

        $scope.createRecipe = function(){

            if (!$scope.newRecipe.title) {
                alert("Title is Required!");
                return;
            }
            if (!$scope.newRecipe.tag1) {
                alert("Main Spirit Tag is Required!");
                return;
            }
            if (!$scope.newRecipe.tag2) {
                alert("Flavor is Required!");
                return;
            }
            if (!$scope.newRecipe.tag3) {
                alert("Level is Required!");
                return;
            }
            if (!$scope.newRecipe.ingredientSpirit) {
                alert("Define at least one spirit!");
                return;
            }

            if (!$scope.newRecipe.step) {
                alert("Step is Required!");
                return;
            }

            var other = [];
            if ($scope.newRecipe.ingredientOther) {
                other = $scope.newRecipe.ingredientOther.split(";");
            }

            var newRecipe =
            {   "_id":0,
                "userId": $scope.currUser._id,
                "title": $scope.newRecipe.title,
                "tag1": $scope.newRecipe.tag1.split(";"),
                "tag2": $scope.newRecipe.tag2.split(";"),
                "tag3": $scope.newRecipe.tag3,
                "ingredientSpirit": $scope.newRecipe.ingredientSpirit.split(";"),
                "ingredientOther": other,
                "step": $scope.newRecipe.step.split(";"),
                "comment":[]
            };

            RecipeService.createRecipeForUser($scope.currUser._id, newRecipe, function(recipe) {
                RecipeService.findAllRecipes(function (recipes) {
                    $scope.recipes = recipes;
                });
                $scope.newRecipe = {"_id":0, "userId":0, "title":"", "tag1":[], "tag2":[], "tag3":"",
                    "ingredientSpirit":[], "ingredientOther":[], "step":[], "user":"", "comment":[]};
                selectedUserIndex = -1;
            });
        };

        $scope.selectRecipe = function(index){
            selectedRecipeIndex = index;

            $scope.newRecipe =
            {   "_id": $scope.recipes[selectedRecipeIndex]._id,
                "userId": $scope.recipes[selectedRecipeIndex].userId,
                "title": $scope.recipes[selectedRecipeIndex].title,
                "tag1": $scope.recipes[selectedRecipeIndex].tag1.join(";"),
                "tag2": $scope.recipes[selectedRecipeIndex].tag2.join(";"),
                "tag3": $scope.recipes[selectedRecipeIndex].tag3,
                "ingredientSpirit": $scope.recipes[selectedRecipeIndex].ingredientSpirit.join(";"),
                "ingredientOther": $scope.recipes[selectedRecipeIndex].ingredientOther.join(";"),
                "step": $scope.recipes[selectedRecipeIndex].step.join(";"),
                "comment": $scope.recipes[selectedRecipeIndex].comment
            };
        };

        $scope.updateRecipe = function(){
            if (selectedRecipeIndex >= 0) {

                if (!$scope.newRecipe.title) {
                    alert("Title is Required!");
                    return;
                }
                if (!$scope.newRecipe.tag1) {
                    alert("Main Spirit Tag is Required!");
                    return;
                }
                if (!$scope.newRecipe.tag2) {
                    alert("Flavor is Required!");
                    return;
                }
                if (!$scope.newRecipe.tag3) {
                    alert("Level is Required!");
                    return;
                }
                if (!$scope.newRecipe.ingredientSpirit) {
                    alert("Define at least one spirit!");
                    return;
                }
                if (!$scope.newRecipe.step) {
                    alert("Step is Required!");
                    return;
                }

                var other = [];
                if ($scope.newRecipe.ingredientOther) {
                    other = $scope.newRecipe.ingredientOther.split(";");
                }

                var newRecipe =
                {   "_id": $scope.newRecipe._id,
                    "userId": $scope.newRecipe.userId,
                    "title": $scope.newRecipe.title,
                    "tag1": $scope.newRecipe.tag1.split(";"),
                    "tag2": $scope.newRecipe.tag2.split(";"),
                    "tag3": $scope.newRecipe.tag3,
                    "ingredientSpirit": $scope.newRecipe.ingredientSpirit.split(";"),
                    "ingredientOther": other,
                    "step": $scope.newRecipe.step.split(";"),
                    "comment": $scope.newRecipe.comment
                };

                RecipeService.updateRecipeById(newRecipe._id, newRecipe, function(user) {
                    RecipeService.findAllRecipes(function (recipes) {
                        $scope.recipes = recipes;
                    });
                    $scope.newRecipe = {"_id":0, "userId":0, "title":"", "tag1":[], "tag2":[], "tag3":"",
                        "ingredientSpirit":[], "ingredientOther":[], "step":[], "user":"", "comment":[]};
                    selectedUserIndex = -1;
                });
            }
        };

        $scope.deleteRecipe = function (index) {

            var delRecipe =
            {   "_id": $scope.recipes[index]._id,
                "userId": $scope.recipes[index].userId,
                "title": $scope.recipes[index].title,
                "tag1": $scope.recipes[index].tag1,
                "tag2": $scope.recipes[index].tag2,
                "tag3": $scope.recipes[index].tag3,
                "ingredientSpirit": $scope.recipes[index].ingredientSpirit,
                "ingredientOther": $scope.recipes[index].ingredientOther,
                "step": $scope.recipes[index].step,
                "comment": $scope.recipes[index].comment
            };

            RecipeService.deleteRecipeById(delRecipe._id, function(users) {
                $scope.newRecipe = {"_id":0, "userId":0, "title":"", "tag1":[], "tag2":[], "tag3":"",
                    "ingredientSpirit":[], "ingredientOther":[], "step":[], "user":"", "comment":[]};
                RecipeService.findAllRecipes(function (recipes) {
                    $scope.recipes = recipes;
                });
            });
        };

    }
})();