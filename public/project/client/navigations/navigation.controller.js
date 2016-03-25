/**
 * Created by lixie on 16/3/1.
 */

(function() {
    angular
        .module("RecipeApp")
        .controller("NavController", navController);

    function navController($scope, $location) {
        $scope.$location = $location;
    }

})();