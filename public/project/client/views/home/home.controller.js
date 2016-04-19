/**
 * Created by lixie on 16/3/4.
 */

(function()
{
    angular
        .module("RecipeApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, $routeParams, $rootScope, UserService, RecipeService, $location)
    {
        /*    <h3 class="m_1">Top Rated</h3>*/
        var vm = this;

        vm.currUser = UserService.getCurrentUser();
        vm.searchStr = $routeParams.searchStr;
        vm.noPic = noPic;
        vm.sortOptions = [
            {"label":"rating high to low",
                "value":{"predicate": "rating", "reverse": true}},
            {"label":"rating low to high",
                "value":{"predicate": "rating", "reverse": false}},
            {"label":"lastest first",
                "value":{"predicate": "created", "reverse": true}},
            {"label":"oldest first",
                "value":{"predicate": "created", "reverse": false}},
            {"label":"title A-Z",
                "value":{"predicate": "title", "reverse": false}},
            {"label":"title Z-A",
                "value":{"predicate": "title", "reverse": true}}
        ];
        vm.sortType = vm.sortOptions[0].value;
        vm.predicate = "rating";
        vm.reverse = true;
        vm.sort = sort;

        if(vm.searchStr) {
            console.log(vm.searchStr);
            vm.searchArray = vm.searchStr.split("&");

            if(vm.searchArray.length == 3) {
                var tag1 = vm.searchArray[0].split("+");
                var tag2 = vm.searchArray[1].split("+");
                var tag3 = vm.searchArray[2].split("+");
                console.log(tag1);
                console.log(tag2);
                console.log(tag3);
                var searchObj = {
                    tag1: tag1,
                    tag2: tag2,
                    tag3: tag3
                };
                localSearchObj(searchObj);
            } else {
                localSearchStr(vm.searchStr);
            }

        } else {
            vm.homeTitle = "Many Recipes Available Here :";
            vm.homeSubtitle = "";
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

        function localSearchStr(searchStr) {
            vm.recipes = [];
            RecipeService
                .findAllRecipesForStr(searchStr)
                .then(function(response){
                    if (response.data.length == 0) {
                        vm.homeTitle = "Sorry! No recipe for '"+searchStr+"'";
                        vm.homeSubtitle = "Many other recipes available here :";
                        init();
                    } else {
                        vm.homeTitle = "Result(s) of '"+searchStr+"' :";
                        vm.homeSubtitle = "";
                        vm.recipes = response.data;
                    }
                })
        }

        function localSearchObj(searchObj) {
            console.log(searchObj);
            RecipeService
                .findAllRecipesForObj(searchObj)
                .then(function(response){
                    var showStr = "";
                    for (s in vm.searchArray) {
                        if(vm.searchArray[s] != "") {
                            if(showStr == "") {
                                showStr = vm.searchArray[s];
                            } else {
                                showStr = showStr + "+" + vm.searchArray[s];
                            }
                        }
                    }
                    if (response.data.length == 0) {
                        vm.homeTitle = "Sorry! No recipe for '"+showStr+"'";
                        vm.homeSubtitle = "Many other recipes available here :";
                        init();
                    } else {
                        vm.homeTitle = "Result(s) of '"+showStr+"' :";
                        vm.homeSubtitle = "";
                        vm.recipes = response.data;
                    }
                })
        }

        function noPic(pic) {
            return (pic == null || pic == undefined || pic.length == 0);
        }

        function sort(sortType) {
            vm.predicate = sortType.predicate;
            vm.reverse = sortType.reverse;
        }

    }
})();