(function()
{
    angular
        .module("RecipeApp")
        .controller("PublicController", PublicController);

    function PublicController($scope, $routeParams, UserService, RecipeService)
    {
        var vm = this;

        //console.log("enterred public controller");

        vm.cannotFollow = cannotFollow;
        vm.canUnfollow = canUnfollow;
        vm.followUser = followUser;
        vm.unfollowUser = unfollowUser;
        vm.noPic = noPic;

        function init() {

            vm.currUser = UserService.getCurrentUser();
            vm.visitUserId = $routeParams.userId;
            vm.visitUser = {};
            vm.myRecipes = [];
            vm.likedRecipes = [];
            vm.followedUsers = [];

            UserService
                .findUserById(vm.visitUserId)
                .then(function(response){
                    vm.visitUser = response.data;

                    RecipeService
                        .findAllRecipesForUser(vm.visitUser._id)
                        .then(function(res1){
                            vm.myRecipes = res1.data;
                        });

                    RecipeService
                        .findAllLikedRecipesForUser(vm.visitUser.like)
                        .then(function(res2){
                            vm.likedRecipes = res2.data;
                        });

                    UserService
                        .findAllFollowedUsersForUser(vm.visitUser.follow)
                        .then(function(res3){
                            vm.followedUsers = res3.data;
                            for(var u in res3.data) {
                                (function() {
                                    var i = u;
                                    RecipeService
                                        .findAllRecipesForUser(res3.data[i]._id)
                                        .then(function(res4){
                                            vm.followedUsers[i].recipeNumber = res4.data.length;
                                        });
                                })();

                            }
                        });

                });

        }
        init();

        function cannotFollow(userId) {
            return (!UserService.isLoggedIn() // not loggedIn
            || UserService.isMe(userId) // OR is the user self
            || (vm.currUser.follow.indexOf(userId) >= 0)); // OR has followed this user
        }

        function canUnfollow(userId) {
            return (UserService.isLoggedIn() // loggedIn
            && (vm.currUser.follow.indexOf(userId) >= 0)); // AND has followed this user
        }

        function followUser(followerId, followedId) {
            UserService
                .followUser(followerId, followedId)
                .then(
                    function(response){
                        setUser(followerId);
                    },
                    function(err){
                        vm.error = err;
                    });
        }

        function unfollowUser(followerId, followedId) {
            UserService
                .unfollowUser(followerId, followedId)
                .then(
                    function(response){
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