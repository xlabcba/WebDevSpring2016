/**
 * Created by lixie on 16/3/29.
 */

(function(){
    angular
        .module("emptyToNull", [])
        .directive("emptyToNull", emptyToNull);

    function emptyToNull() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                ctrl.$parsers.push(function(viewValue) {
                    if(viewValue === "") {
                        return null;
                    }
                    return viewValue;
                });
            }
        };
    }
})();
