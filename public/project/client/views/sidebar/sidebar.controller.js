(function()
{
    angular
        .module("RecipeApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($rootScope, $scope, $location, UserService)
    {
        var vm = this;

        vm.isProfile = isProfile;
        vm.isAdmin = isAdmin;
        vm.isProfileOrAdmin = isProfileOrAdmin;
        vm.searchTags = searchTags;


        function init() {
            vm.$location = $location;
            vm.tag1 = [
                {value: "beer"}, {value: "bourbon"}, {value: "champagne"}, {value: "cognac"},
                {value: "cordials"}, {value: "gin"}, {value: "rum"}, {value: "rye"},
                {value: "sparkling"}, {value: "tequila"}, {value: "vermouth"}, {value: "vodka"}, {value: "whisky"},
                {value: "wine"}
            ];
            vm.tag2 = [
                {value: "frozen"}, {value: "fruity"}, {value: "hot"}, {value: "savory"}, {value: "sour"},
                {value: "spicy"}, {value: "sweet"}
            ];
            vm.tag3 = [
                {value: "beginner"}, {value: "intermediate"}, {value: "advanced"}
            ];
            vm.pushTag1 = {};
            vm.pushTag2 = {};
            vm.pushTag3 = {};

        }
        init();

        function isProfile() {
            return (vm.$location.url().indexOf('profile') >= 0 && vm.$location.url().indexOf('profile_public') < 0);
        }
        function isAdmin() {
            return vm.$location.url().indexOf('admin') >= 0;
        }

        function isProfileOrAdmin() {
            return (isProfile() || isAdmin());
        }

        function searchTags() {

            var array1 = Object.keys(vm.pushTag1);
            var array2 = Object.keys(vm.pushTag2);
            var array3 = Object.keys(vm.pushTag3);

            console.log(array1);
            console.log(array2);
            console.log(array3);

            if (array1.length == 0 && array2.length == 0 && array3.length == 0) {
                alert("please select at least one tags to search");
                return;
            }

            var searchStr = array1.join("+")+"&"+array2.join("+")+"&"+array3.join("+");

            vm.pushTag1 = {};
            vm.pushTag2 = {};
            vm.pushTag3 = {};

            $location.url("/home/"+searchStr);

        }


    }
})();