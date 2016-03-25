/**
 * Created by lixie on 16/3/23.
 */

module.exports = function(app, userModel, recipeModel) {

    app.get("/api/project/recipe", getAllRecipes);
    app.get("/api/project/user/:userId/recipe", getAllRecipesForUser);
    app.get("/api/project/recipe/:recipeId", getRecipeById);
    app.delete("/api/project/recipe/:recipeId", deleteRecipe);
    app.post("/api/project/user/:userId/recipe", createNewRecipeForUser);
    app.put("/api/project/recipe/:recipeId", updateRecipe);
    app.post("/api/project/user/:userId/recipe/:recipeId", userLikesRecipe);

    function getAllRecipes(req, res) {
        var recipes = recipeModel.findAllRecipes();
        res.json(forms);
    }

    function getAllRecipesForUser(req, res) {
        var userId = req.params.userId;
        var recipes = recipeModel.findAllRecipesForUser(userId);
        res.json(recipes);
    }

    function  getRecipeById(req, res) {
        var recipeId = req.params.recipeId;
        var recipe = recipeModel.findRecipeById(recipeId);
        res.json(recipe);
    }

    function deleteRecipe(req, res) {
        var recipeId = req.params.recipeId;
        var recipes = recipeModel.deleteRecipeById(recipeId);
        res.json(recipes);
    }

    function createNewRecipeForUser(req, res) {
        var recipe = req.body;
        var userId = req.params.userId;
        var recipes = recipeModel.createRecipeForUser(userId, recipe);
        res.json(recipes);
    }

    function updateRecipe(req, res) {
        var newRecipe = req.body;
        var recipeId = req.params.recipeId;
        var recipes = recipeModel.updateRecipeById(recipeId, newRecipe);
        res.json(recipes);
    }

    function  userLikesRecipe(req, res) {
        var userId = req.params.userId;
        var recipeId = req.params.recipeId;
        recipeModel
            .likeByUser(userId, recipeId)
            .then(function(response){
                if(response == null) {
                    res.json(null);
                } else {
                    return userModel.likeRecipe(userId, recipeId);
                }
            })
            .then(function(response){
                res.json(response);
            });
    }
};