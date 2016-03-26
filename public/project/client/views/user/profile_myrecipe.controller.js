/**
 * Created by lixie on 16/3/4.
 */

(function()
{
    angular
        .module("RecipeApp")
        .controller("MyRecipeController", MyRecipeController);

    function MyRecipeController($rootScope, $scope, $location, RecipeService)
    {
        var vm = this;

        vm.deleteRecipe = deleteRecipe;

        var currUser = $rootScope.currentUser;

        function init() {
            RecipeService
                .findAllRecipesForUser(currUser._id)
                .then(function(response){
                    vm.recipes = response.data;
                });
        }
        init();

        function deleteRecipe(recipe) {
            RecipeService
                .deleteRecipeById(recipe._id)
                .then(function(response){
                    init()
                });
        }

    }

})();