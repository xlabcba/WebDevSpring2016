/**
 * Created by lixie on 16/3/2.
 */

(function() {
    angular
        .module("RecipeApp")
        .controller("DetailController", detailController);

    function detailController($scope, $routeParams, SearchService) {
        $scope.id = $routeParams.id;

        SearchService.searchByID($scope.id)
            .then(function(resp) {
                if (resp === undefined) {
                    alert("Item you are trying to search could not be found!!!");
                } else {
                    console.log(resp);
                    $scope.detail = resp;
                }
            });


    }

})();