/**
 * Created by lixie on 16/3/4.
 */

(function()
{
    angular
        .module("RecipeApp")
        .controller("RecipeController", RecipeController);

    function RecipeController($scope, $rootScope, $routeParams, RecipeService, CommentService)
    {
        var vm = this;

        vm.currUser = $rootScope.currentUser;
        vm.recipeId = $routeParams.recipeId;
        vm.imgIndexes = [];
        vm.currImgIndex = 0;

        function init() {
            RecipeService
                .getRecipeById(vm.recipeId)
                .then(function(response){
                    console.log(response.data);
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
                });
        }


    }
})();