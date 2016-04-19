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
        vm.noPic = noPic;

        function init() {
            vm.currUser = UserService.getCurrentUser();

            RecipeService
                .findAllLikedRecipesForUser(vm.currUser.like)
                .then(function(response){
                    vm.likedRecipes = response.data;
                });
        }
        init();

        function unlikeRecipe(recipe) {
            RecipeService
                .userUnlikesRecipe(vm.currUser._id, recipe._id)
                .then(function(response){
                        setUser(vm.currUser._id);
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