/**
 * Created by lixie on 16/3/4.
 */

(function()
{
    angular
        .module("RecipeApp")
        .controller("FavoriteController", FavoriteController);

    function FavoriteController($rootScope, $scope, $location, RecipeService, UserService)
    {
        var vm = this;

        vm.unlikeRecipe = unlikeRecipe;

        function init() {
            vm.currUser = $rootScope.currentUser;
            console.log(vm.currUser.like);
            RecipeService
                .findAllLikedRecipesForUser(vm.currUser.like)
                .then(function(response){
                    console.log(response.data);
                    vm.likedRecipes = response.data;
                });
        }
        init();

        function unlikeRecipe(recipe) {
            console.log("going to recipe client service");
            console.log(recipe._id);
            console.log(vm.currUser._id);
            RecipeService
                .userUnlikesRecipe(vm.currUser._id, recipe._id)
                .then(function(response){
                    setUser(response.data);
                });
        }

        function setUser(user) {
            UserService.setCurrentUser(user);
            init();
        }
    }
})();