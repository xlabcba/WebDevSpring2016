/**
 * Created by lixie on 16/3/4.
 */

(function()
{
    angular
        .module("RecipeApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $routeParams, $rootScope, RecipeService, $location)
    {
        /*    <h3 class="m_1">Top Rated</h3>*/
        var vm = this;

        vm.currUser = $rootScope.currentUser;
        vm.searchStr = $routeParams.searchStr;

        if(vm.searchStr) {
            localSearch(vm.searchStr);
        } else {
            init();
        }

        function init() {
            vm.recipes = [];
            RecipeService
                .findAllRecipes()
                .then(function(response){
                    vm.recipes = response.data;
                });
        }

        function localSearch(searchStr) {
            vm.recipes = [];
            RecipeService
                .findAllRecipesForStr(searchStr)
                .then(function(response){
                    vm.recipes = response.data;
                    console.log(vm.recipes);
                })
        }

    }
})();