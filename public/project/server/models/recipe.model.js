/**
 * Created by lixie on 16/3/23.
 */

// load mock forms data
var mock = require("./recipe.mock.json");
var Guid = require("../js/guid.js");

module.exports = function(userModel, commentModel) {

    var api = {

        createRecipeForUser: createRecipeForUser,
        findAllRecipes: findAllRecipes,
        findAllRecipesForUser: findAllRecipesForUser,
        findRecipeById: findRecipeById,
        deleteRecipeById: deleteRecipeById,
        updateRecipeById: updateRecipeById,
        deleteRecipeOfUser: deleteRecipeOfUser,
        updateRating: updateRating,
        likeByUser: likeByUser,
        unlikeByUser: unlikeByUser

    };
    return api;

    function createRecipeForUser(userId, recipe) {
        var newRecipe = {
            _id: Guid.create(), //"ID_" + (new Date()).getTime(),
            userId: userId,
            title: recipe.title,
            rating: "0",
            rateImg: "./images/star0.png",
            likeBy:[],
            tag1: recipe.tag1,
            tag2: recipe.tag2,
            tag3: recipe.tag3,
            ingredientSpirit: recipe.ingredientSpirit,
            ingredientOther: recipe.ingredientOther,
            step: recipe.step
        };
        mock.push(newRecipe);
        return mock;
    }

    function findAllRecipes() {
        return mock;
    }

    function findAllRecipesForUser(userId) {
        var ret_recipes = [];
        for(var r in mock) {
            if(mock[r].userId == userId) {
                ret_recipes.push(mock[r]);
            }
        }
        return ret_recipes;
    }

    function findRecipeById(recipeId) {
        for(var r in mock) {
            if(mock[r].recipeId == recipeId) {
                return mock[r];
            }
        }
        return null;
    }

    function deleteRecipeById(recipeId) {
        userModel.deleteRecipeFromLike(recipeId);
        commentModel.deleteCommentOfRecipe(recipeId);
        for(var r in mock) {
            if(mock[r]._id == recipeId) {
                mock.splice(r,1);
                return mock;
            }
        }
        return null;
    }

    function updateRecipeById(recipeId, newRecipe) {
        for(var r in mock) {
            if(mock[r]._id == recipeId) {
                mock.splice(r,1,newRecipe);
                return mock;
            }
        }
        return null;
    }

    function deleteRecipeOfUser(userId) {
        for(var r in mock) {
            if(mock[r].userId == userId) {
                deleteRecipeById(mock[r]._id);
            }
        }
        return null;
    }

    function updateRating(recipeId, rating) {
        var rateImg;
        if (rating == 1) {
            rateImg = "./images/star1.png";
        } else if (rating == 2) {
            rateImg = "./images/star2.png";
        } else if (rating == 3) {
            rateImg = "./images/star3.png";
        } else if (rating == 4) {
            rateImg = "./images/star4.png";
        } else if (rating == 5) {
            rateImg = "./images/star5.png";
        } else {
            rateImg = "./images/star0.png";
        }
        for(var r in mock) {
            if(mock[r].recipeId == recipeId) {
                mock[r].rating = rating;
                mock[r].rateImg = rateImg;
                return true;
            }
        }
        return false;
    }

    function likeByUser(userId, recipeId) {
        for(var r in mock) {
            if(mock[r].recipeId == recipeId) {
                mock[r].likeBy.push(userId);
                return mock[r];
            }
        }
        return null;
    }

    function unlikeByUser(userId, recipeId) {
        for(var r in mock) {
            if(mock[r].recipeId == recipeId) {
                for(var l in mock[r].likeBy) {
                    if(mock[r].likeBy[l] == userId) {
                        mock[r].likeBy.splice(l,1);
                        return mock[r];
                    }
                }
            }
        }
        return null;
    }

};