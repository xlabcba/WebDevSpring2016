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
        vm.noPic = noPic;

        function init() {
            vm.followedUsers = [];
            vm.currUser = UserService.getCurrentUser();
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
                        setUser(followerId);
                    },
                    function(err){
                        vm.error = err;
                    });
        }

        function setUser(userId) {
            UserService
                .findUserById(userId)
                .then(
                    function(response){
                        UserService.setCurrentUser(response.data);
                        init();
                    },
                    function(err){
                        vm.error = err;
                    });
        }

        function noPic(pic) {
            return (pic == null || pic == undefined || pic.length == 0);
        }

    }
})();