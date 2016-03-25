(function(){
    angular
        .module("RecipeApp")
        .factory("RecipeService", RecipeService);

    function RecipeService($http) {

        var service = {
            createRecipeForUser: createRecipeForUser,
            findAllRecipesForUser: findAllRecipesForUser,
            deleteRecipeById: deleteRecipeById,
            updateRecipeById: updateRecipeById,
            getRecipeById: getRecipeById,
            likeRecipe: likeRecipe
        };

        return service;

        function createRecipeForUser(userId, recipe) {
            return $http.post("/api/project/user/"+userId+"/recipe", recipe);
        }

        function findAllRecipesForUser(userId) {
            return $http.get("/api/project/user/"+userId+"/recipe");
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

        function likeRecipe(userId, recipeId) {
            return $http.post("/api/project/user/"+userId+"/recipe/"+recipeId);
        }
    }
})();