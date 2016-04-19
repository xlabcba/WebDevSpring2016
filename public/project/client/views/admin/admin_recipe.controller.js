/**
 * Created by lixie on 16/3/23.
 */

(function()
{
    angular
        .module("RecipeApp")
        .controller("AdminRecipeController", AdminRecipeController);

    function AdminRecipeController($rootScope, $scope, $location, RecipeService)
    {
        var vm = this;

        vm.deleteRecipe = deleteRecipe;
        vm.noPic = noPic;

        function init() {
            vm.recipes = [];
            RecipeService
                .findAllRecipes()
                .then(function(response){
                    vm.recipes = response.data;
                });

        }
        init();

        function deleteRecipe(recipe) {
            RecipeService
                .deleteRecipeById(recipe._id)
                .then(function(response){
                    init();
                });
        }

        function noPic(pic) {
            return (pic == null || pic == undefined || pic.length == 0);
        }

    }
})();