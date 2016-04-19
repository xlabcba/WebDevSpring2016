/**
 * Created by lixie on 16/3/4.
 */

(function()
{
    angular
        .module("RecipeApp")
        .controller("MyRecipeController", MyRecipeController);

    function MyRecipeController($rootScope, $scope, $location, UserService, RecipeService)
    {
        var vm = this;

        vm.deleteRecipe = deleteRecipe;
        vm.noPic = noPic;

        function init() {
            vm.currUser = UserService.getCurrentUser();

            RecipeService
                .findAllRecipesForUser(vm.currUser._id)
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

        function noPic(pic) {
            return (pic == null || pic == undefined || pic.length == 0);
        }

    }

})();