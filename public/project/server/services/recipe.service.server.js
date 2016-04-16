/**
 * Created by lixie on 16/3/23.
 */

var fs = require("fs");
var path = require("path");

module.exports = function(app, userModel, recipeModel, commentModel) {

    app.get("/api/project/recipe", getAllRecipes);
    app.get("/api/project/recipe/localSearch/:searchStr", getAllRecipesForStr);
    app.get("/api/project/user/:userId/recipe", getAllRecipesForUser);
    app.get("/api/project/recipe/:recipeId", getRecipeById);
    app.delete("/api/project/recipe/:recipeId", deleteRecipe);
    app.post("/api/project/user/:userId/recipe", createNewRecipeForUser);
    app.put("/api/project/recipe/:recipeId", updateRecipe);
    app.post("/api/project/user/:userId/recipe/:recipeId", userLikesRecipe);
    app.put("/api/project/user/:userId/recipe/:recipeId", userUnlikesRecipe);
    app.post("/api/project/recipe/searchLikedRecipes", getAllLikedRecipesForUser);
    app.post("/api/project/recipe/upload", uploadRecipePic);
    app.post("/api/project/recipe/:recipeId/delete/:fileName", deleteRecipePic);


    function getAllRecipes(req, res) {
        var recipes = recipeModel.findAllRecipes();
        res.json(recipes);
    }

    function getAllRecipesForStr(req, res) {
        var searchStr = req.params.searchStr;
        var recipes = recipeModel.findAllRecipesForStr(searchStr);
        res.json(recipes);
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
        commentModel.deleteCommentOfRecipe(recipeId);
        userModel.deleteRecipeFromLike(recipeId);
        var recipes = recipeModel.deleteRecipeById(recipeId);
        res.json(recipes);
    }

    function createNewRecipeForUser(req, res) {
        var recipe = req.body;
        var userId = req.params.userId;
        var newRecipe = recipeModel.createRecipeForUser(userId, recipe);
        res.json(newRecipe);
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
        recipeModel.likeByUser(userId, recipeId);
        var user = userModel.likeRecipe(userId, recipeId);
        res.json(user);
    }

    function userUnlikesRecipe(req, res) {
        var userId = req.params.userId;
        var recipeId = req.params.recipeId;
        recipeModel.unlikeByUser(userId, recipeId);
        var user = userModel.unlikeRecipe(userId, recipeId);
        res.json(user);
    }

    function getAllLikedRecipesForUser(req, res) {
        var likedRecipes = req.body;
        var recipes = recipeModel.findAllLikedRecipesForUser(likedRecipes);
        res.json(recipes);
    }

    function uploadRecipePic (req,res){
        var recipeId = req.body.recipeId;
        var myFile = req.files.myFile;
        console.log(recipeId);
        console.log(myFile);

        var file = {
            path: myFile.path,
            name: myFile.name,
            size: myFile.size,
            type: myFile.type
        };

        var savePath = "../../uploads/" + file.name;

        console.log(savePath);

        // optionally rename the file to its original name
        var oldPath = path.resolve(myFile.path);
        var newPath = path.resolve(__dirname + "/../../../../public/uploads/" + myFile.name);

        console.log(oldPath);
        console.log(newPath);

        fs.rename(oldPath, newPath);

        recipeModel.updateRecipePic(recipeId, savePath, "save");
        res.location("/project/client/index.html#/recipe_edit/"+recipeId);  //TODO: change to redirect

    }

    function deleteRecipePic(req, res) {
        var recipeId = req.params.recipeId;
        var fileName = req.params.fileName;
        var savePath = "../../uploads/" + fileName;
        console.log(fileName);
        var recipeImgs = recipeModel.updateRecipePic(recipeId, savePath, "delete");
        var thePath = path.resolve(__dirname + "/../../../../public/uploads/" + fileName);
        fs.unlink(thePath);
        res.json(recipeImgs);
    }
};