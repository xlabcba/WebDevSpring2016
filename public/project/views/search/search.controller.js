/**
 * Created by lixie on 16/3/1.
 */

(function() {
    angular
        .module("RecipeApp")
        .controller("SearchController", searchController);

    function searchController($scope, $location, $routeParams, SearchService) {
        $scope.search = search;
        $scope.spirit = $routeParams.spirit;
        $scope.zipcode = $routeParams.zipcode;

        if($scope.spirit && $scope.zipcode) {
            search($scope.spirit,$scope.zipcode);
        }

        function search(spirit, zipcode) {
            $location.url("/search/"+$scope.spirit+" "+$scope.zipcode);
            console.log(spirit);
            console.log(zipcode);

            SearchService.searchByTermAndLocation(spirit, zipcode)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found");
                    } else if (resp.businesses.length === 0) {
                        alert("Item you are trying to search could not be found");
                        $location.path("/home");

                    } else {
                        console.log(resp);
                        $scope.result = resp;
                    }

                });
        }
    }

})();