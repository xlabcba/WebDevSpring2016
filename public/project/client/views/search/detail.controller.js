/**
 * Created by lixie on 16/3/2.
 */

(function() {
    angular
        .module("RecipeApp")
        .controller("DetailController", detailController);

    function detailController($scope, $routeParams, SearchService, uiGmapGoogleMapApi) {

        var vm = this;
        vm.storeId = $routeParams.id;

        function init() {
            //console.log(vm.storeId);
            SearchService.searchByID(vm.storeId)
                .then(function(resp) {
                    if (resp === undefined) {
                        alert("Item you are trying to search could not be found!!!");
                        vm.store = null;
                    } else {
                        //console.log(resp);
                        vm.store = resp;
                        uiGmapGoogleMapApi.then(function(maps) {
                            vm.map = {
                                center: {
                                    latitude: vm.store.location.coordinate.latitude,
                                    longitude: vm.store.location.coordinate.longitude
                                },
                                zoom: 14
                            };
                            vm.marker = {
                                id: 0,
                                coords: {
                                    latitude: vm.store.location.coordinate.latitude,
                                    longitude: vm.store.location.coordinate.longitude
                                },
                                options: { draggable: true },
                                events: {
                                    dragend: function (marker, eventName, args) {
                                        //console.log('marker dragend');
                                        var lat = marker.getPosition().lat();
                                        var lon = marker.getPosition().lng();
                                        //console.log(lat);
                                        //console.log(lon);

                                        vm.marker.options = {
                                            draggable: true,
                                            labelContent: "lat: " + vm.marker.coords.latitude + ' ' + 'lon: ' + vm.marker.coords.longitude,
                                            labelAnchor: "100 0",
                                            labelClass: "marker-labels"
                                        };
                                    }
                                }
                            };
                        });
                    }
                });
        }
        init();

        $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
            if (_.isEqual(newVal, oldVal))
                return;
            $scope.coordsUpdates++;
        });

    }

})();