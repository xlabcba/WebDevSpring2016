/**
 * Created by lixie on 16/3/23.
 */

var fs = require("fs");
var path = require("path");
var mv = require("mv");

module.exports = function(app, userModelProj, recipeModel, commentModel) {

    app.get("/api/project/recipe", getAllRecipes);
    app.get("/api/project/recipe/localSearch/:searchStr", getAllRecipesForStr);
    app.post("/api/project/recipe/localSearch", getAllRecipesForObj);
    app.get ("/api/project/complete/:title", completeTitle);
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
        /*
        var recipes = recipeModel.findAllRecipes();
        res.json(recipes);
        */

        recipeModel.findAllRecipes()
            .then(
                function ( docs ) {
                    res.json(docs);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function getAllRecipesForStr(req, res) {
        /*
        var searchStr = req.params.searchStr;
        var recipes = recipeModel.findAllRecipesForStr(searchStr);
        res.json(recipes);
        */

        var searchStr = req.params.searchStr;
        recipeModel.findAllRecipesForStr(searchStr)
            .then(
                function ( docs ) {
                    res.json(docs);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function getAllRecipesForObj(req, res) {
        var searchObj = req.body;
        recipeModel.findAllRecipesForObj(searchObj)
            .then(
                function ( docs ) {
                    res.json(docs);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function getAllRecipesForUser(req, res) {
        /*
        var userId = req.params.userId;
        var recipes = recipeModel.findAllRecipesForUser(userId);
        res.json(recipes);
        */

        var userId = req.params.userId;
        recipeModel.findAllRecipesForUser(userId)
            .then(
                function ( docs ) {
                    res.json(docs);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function completeTitle(req, res) {
        var title = req.params.title;

        recipeModel
            .completeTitle(title)
            .then(
                function(recipes){
                    res.json(recipes);
                },
                function(err){
                    res.status(400).send(err);
                }
            )
    }

    function  getRecipeById(req, res) {
        /*
        var recipeId = req.params.recipeId;
        var recipe = recipeModel.findRecipeById(recipeId);
        res.json(recipe);
        */

        var recipeId = req.params.recipeId;
        recipeModel.findRecipeById(recipeId)
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function deleteRecipe(req, res) {
        /*
        var recipeId = req.params.recipeId;
        commentModel.deleteCommentOfRecipe(recipeId);
        userModel.deleteRecipeFromLike(recipeId);
        var recipes = recipeModel.deleteRecipeById(recipeId);
        res.json(recipes);
        */

        var recipeId = req.params.recipeId;
        commentModel.deleteCommentOfRecipe(recipeId)
            .then(
                function ( stats ) {
                    return userModelProj.deleteRecipeFromLike(recipeId);
                },
                function ( err ) {
                    res.status(400).send(err);
                })
            .then(
                function ( stats ) {
                    return recipeModel.deleteRecipeById(recipeId);
                },
                function ( err ) {
                    res.status(400).send(err);
                })
            .then(
                function ( stats ) {
                    res.send(200);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function createNewRecipeForUser(req, res) {
        /*
        var recipe = req.body;
        var userId = req.params.userId;
        var newRecipe = recipeModel.createRecipeForUser(userId, recipe);
        res.json(newRecipe);
        */

        var recipe = req.body;
        var userId = req.params.userId;

        recipeModel.createRecipeForUser(userId, recipe)
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function updateRecipe(req, res) {
        /*
        var newRecipe = req.body;
        var recipeId = req.params.recipeId;
        var recipes = recipeModel.updateRecipeById(recipeId, newRecipe);
        res.json(recipes);
        */

        var newRecipe = req.body;
        var recipeId = req.params.recipeId;

        recipeModel.updateRecipeById(recipeId, newRecipe)
            .then(
                function ( stats ) {
                    res.send(200);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function  userLikesRecipe(req, res) {
        /*
        var userId = req.params.userId;
        var recipeId = req.params.recipeId;
        recipeModel.likeByUser(userId, recipeId);
        var user = userModel.likeRecipe(userId, recipeId);
        res.json(user);
        */

        var userId = req.params.userId;
        var recipeId = req.params.recipeId;

        recipeModel.likeByUser(userId, recipeId)
            .then(
                function ( doc ) {
                    return userModelProj.likeRecipe(userId, recipeId);
                },
                function ( err ) {
                    res.status(400).send(err);
                })
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function userUnlikesRecipe(req, res) {
        /*
        var userId = req.params.userId;
        var recipeId = req.params.recipeId;
        recipeModel.unlikeByUser(userId, recipeId);
        var user = userModel.unlikeRecipe(userId, recipeId);
        res.json(user);
        */

        var userId = req.params.userId;
        var recipeId = req.params.recipeId;

        recipeModel.unlikeByUser(userId, recipeId)
            .then(
                function ( doc ) {
                    return userModelProj.unlikeRecipe(userId, recipeId);
                },
                function ( err ) {
                    res.status(400).send(err);
                })
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function getAllLikedRecipesForUser(req, res) {
        /*
        var likedRecipes = req.body;
        var recipes = recipeModel.findAllLikedRecipesForUser(likedRecipes);
        res.json(recipes);
        */

        var likedRecipes = req.body;

        recipeModel.findAllLikedRecipesForUser(likedRecipes)
            .then(
                function ( docs ) {
                    res.json(docs);
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function uploadRecipePic (req,res){
        var recipeId = req.body.recipeId;
        var myFile = req.files.myFile;
        //console.log(recipeId);
        //console.log(myFile);

        var file = {
            path: myFile.path,
            name: myFile.name, // TODO: change to unique name;
            size: myFile.size,
            type: myFile.type
        };

        var saveFileNameArray = file.path.split('/');

        var saveFileName = saveFileNameArray[saveFileNameArray.length - 1];

        var savePath = "../../uploads/" + saveFileName;

        //console.log(savePath);

        // optionally rename the file to its original name
        var oldPath = path.resolve(myFile.path);
        var newPath = path.resolve(__dirname + "/../../../../public/uploads/" + saveFileName);

        //console.log(oldPath);
        //console.log(newPath);

        //fs.rename(oldPath, newPath);

        recipeModel.updateRecipePic(recipeId, savePath, "save")
            .then(
                function ( doc ) {
                    mv(oldPath, newPath, function(err){
                        if(!err) {
                            res.redirect("/project/client/index.html#/recipe_edit/"+recipeId);
                        } else {
                            res.status(400).send(err);
                        }
                    });
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }

    function deleteRecipePic(req, res) {
        var recipeId = req.params.recipeId;
        var fileName = req.params.fileName;
        var savePath = "../../uploads/" + fileName;
        //console.log(fileName);

        recipeModel.updateRecipePic(recipeId, savePath, "delete")
            .then(
                function ( doc ) {
                    var thePath = path.resolve(__dirname + "/../../../../public/uploads/" + fileName);
                    fs.unlink(thePath, function(err){
                        if(!err) {
                            res.redirect("/project/client/index.html#/recipe_edit/"+recipeId);
                        } else {
                            res.status(400).send(err);
                        }
                    });
                },
                function ( err ) {
                    res.status(400).send(err);
                });

    }
};