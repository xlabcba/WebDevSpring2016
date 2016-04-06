(function(){
    angular
        .module("RecipeApp")
        .factory("RecipeService", RecipeService);

    function RecipeService($http) {

        var service = {
            createRecipeForUser: createRecipeForUser,
            findAllRecipes: findAllRecipes,
            findAllRecipesForStr: findAllRecipesForStr,
            findAllRecipesForUser: findAllRecipesForUser,
            findAllLikedRecipesForUser: findAllLikedRecipesForUser,
            deleteRecipeById: deleteRecipeById,
            updateRecipeById: updateRecipeById,
            getRecipeById: getRecipeById,
            userLikesRecipe: userLikesRecipe,
            userUnlikesRecipe: userUnlikesRecipe
        };

        return service;

        function createRecipeForUser(userId, recipe) {
            return $http.post("/api/project/user/"+userId+"/recipe", recipe);
        }

        function findAllRecipesForStr(searchStr) {
            return $http.get("/api/project/recipe/localSearch/"+searchStr);
        }

        function findAllRecipes() {
            return $http.get("/api/project/recipe");
        }

        function findAllRecipesForUser(userId) {
            return $http.get("/api/project/user/"+userId+"/recipe");
        }

        function findAllLikedRecipesForUser(likedRecipes) {
            return $http.post("/api/project/recipe/searchLikedRecipes", likedRecipes);
        }

        function deleteRecipeById(recipeId) {
            return $http.delete("/api/project/recipe/"+recipeId);
        }

        function updateRecipeById(recipeId, newRecipe) {
            return $http.put("/api/project/recipe/"+recipeId, newRecipe);
        }

        function getRecipeById(recipeId) {
            return $http.get("/api/project/recipe/"+recipeId);
        }

        function userLikesRecipe(userId, recipeId) {
            return $http.post("/api/project/user/"+userId+"/recipe/"+recipeId);
        }

        function userUnlikesRecipe(userId, recipeId) {
            return $http.put("/api/project/user/"+userId+"/recipe/"+recipeId);
        }
    }
})();