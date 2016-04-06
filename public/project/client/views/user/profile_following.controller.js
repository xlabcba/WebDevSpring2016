/**
 * Created by lixie on 16/3/4.
 */

(function()
{
    angular
        .module("RecipeApp")
        .controller("FollowingController", FollowingController);

    function FollowingController($rootScope, $scope, $location, UserService, RecipeService)
    {
        var vm = this;

        vm.unfollowUser = unfollowUser;

        function init() {
            vm.followedUsers = [];
            vm.currUser = $rootScope.currentUser;
            UserService
                .findAllFollowedUsersForUser(vm.currUser.follow)
                .then(function(response){
                    vm.followedUsers = response.data;
                    for(var u in response.data) {
                        console.log("entered for loop");
                        (function() {
                            var i = u;
                            RecipeService
                                .findAllRecipesForUser(response.data[i]._id)
                                .then(function(res){
                                    vm.followedUsers[i].recipeNumber = res.data.length;
                                    console.log(vm.followedUsers[i].recipeNumber);
                                });
                        })();

                    }
                    console.log("exited for loop");
                });
        }
        init();

        function unfollowUser(followedUser) {
            var followerId = vm.currUser._id;
            var followedId = followedUser._id;
            UserService
                .unfollowUser(followerId, followedId)
                .then(function(response){
                    setUser(response.data);
                });
        }

        function setUser(user) {
            UserService.setCurrentUser(user);
            init();
        }

    }
})();