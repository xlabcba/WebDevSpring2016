/**
 * Created by lixie on 16/3/1.
 */

(function() {
    angular
        .module("RecipeApp")
        .controller("SearchController", searchController);

    function searchController($scope, $location, $routeParams, SearchService) {

        var vm = this;

        vm.goToSearch = goToSearch;
        vm.search = search;

        function init() {
            vm.key = $routeParams.key;

            if(!vm.key) {
                vm.spirit = null;
                vm.zipcode = null;
            } else {
                vm.keyArray = vm.key.split("&&");
                if(vm.keyArray.length == 2) {
                    vm.spirit = vm.keyArray[0];
                    vm.zipcode = vm.keyArray[1];
                    search(vm.spirit,vm.zipcode);
                } else if (vm.keyArray.length == 1) {
                    vm.spirit = vm.keyArray[0];
                    vm.zipcode = null;
                } else {
                    alert("too many route params");
                }
            }
        }
        init();

        function goToSearch() {
            if(!vm.spirit) {
                alert("please input spirit category to search");
                return;
            }
            if(!vm.zipcode) {
                alert("please input your zip code to search");
                return;
            }
            $location.url("/search/"+vm.spirit+"&&"+vm.zipcode);
        }

        function search(spirit, zipcode) {
            SearchService.searchByTermAndLocation(spirit, zipcode)
                .then(function(resp) {
                    if (resp === undefined) {
                        vm.resultStr = "Sorry! no result for '"+vm.spirit+"' + '"+vm.zipcode+"'.";
                        return;
                    } else if (resp.businesses.length === 0) {
                        vm.resultStr = "Sorry! no result for '"+vm.spirit+"' + '"+vm.zipcode+"'.";
                        return;
                    } else {
                        //console.log(resp);
                        vm.resultStr = "Result(s) for '"+vm.spirit+"' + '"+vm.zipcode+"' :"
                        vm.result = resp;
                    }

                });
        }
    }

})();