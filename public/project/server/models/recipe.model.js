/**
 * Created by lixie on 16/3/23.
 */

// load mock recipes data
// var mock = require("./recipe.mock.json");
// var Guid = require("../js/guid.js");

// load q promise library
var q = require("q");

module.exports = function(db, mongoose) {

    // load recipe schema from recipe model
    var RecipeSchema = require("./recipe.schema.server.js")(mongoose);

    // create recipe from schema
    var RecipeModel  = mongoose.model("projectRecipe", RecipeSchema);

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
        unlikeByUser: unlikeByUser,
        findAllLikedRecipesForUser: findAllLikedRecipesForUser,
        findAllRecipesForStr: findAllRecipesForStr,
        findAllRecipesForObj: findAllRecipesForObj,
        deleteUserFromLikeBy: deleteUserFromLikeBy,
        updateRecipePic: updateRecipePic,
        completeTitle: completeTitle
    };
    return api;

    function createRecipeForUser(userId, recipe) {
        /*
        var newRecipe = {
            _id: Guid.create(),  //"ID_" + (new Date()).getTime(),
            userId: recipe.userId,
            title: recipe.title,
            recipeImg: recipe.recipeImg,
            rating: "0",
            rateImg: "./images/star0.png",
            likeBy:[],
            tag1: recipe.tag1,
            tag2: recipe.tag2,
            tag3: recipe.tag3,
            ingredientSpirit: recipe.ingredientSpirit,
            ingredientOther: recipe.ingredientOther,
            step: recipe.step,
            overview: recipe.overview
        };
        mock.push(newRecipe);
        return newRecipe;
        */

        recipe.userId = userId;

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        RecipeModel.create(recipe, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;

    }

    function findAllRecipes() {
        /*
        return mock;
        */

        // use q to defer the response
        var deferred = q.defer();

        // find one retrieves one document
        RecipeModel.find(

            // first argument is predicate
            { },

            // doc is unique instance matches predicate
            function(err, docs) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(docs);
                }

            });

        // return a promise
        return deferred.promise;

    }

    function findAllRecipesForUser(userId) {
        /*
        var ret_recipes = [];
        for(var r in mock) {
            if(mock[r].userId == userId) {
                ret_recipes.push(mock[r]);
            }
        }
        return ret_recipes;
        */

        // use q to defer the response
        var deferred = q.defer();

        // find one retrieves one document
        RecipeModel.find(

            // first argument is predicate
            { userId: userId },

            // doc is unique instance matches predicate
            function(err, docs) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(docs);
                }

            });

        // return a promise
        return deferred.promise;

    }

    function findRecipeById(recipeId) {
        /*
        for(var r in mock) {
            if(mock[r]._id == recipeId) {
                return mock[r];
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        // find by id retrieves one document by id
        RecipeModel.findById(recipeId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        // return a promise
        return deferred.promise;

    }

    function deleteRecipeById(recipeId) {
        /*
        for(var r in mock) {
            if(mock[r]._id == recipeId) {
                mock.splice(r,1);
                return mock;
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        // find one retrieves one document
        RecipeModel.remove(

            // first argument is id
            { _id: recipeId },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        // return a promise
        return deferred.promise;
    }

    function updateRecipeById(recipeId, newRecipe) {
        /*
        for(var r in mock) {
            if(mock[r]._id == recipeId) {
                newRecipe.rating = mock[r].rating;
                newRecipe.rateImg = mock[r].rateImg;
                mock.splice(r,1,newRecipe);
                return mock;
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        // find one retrieves one document
        RecipeModel.update(

            // first argument is id
            { _id: recipeId },

            // second argument is object to update
            { $set: newRecipe },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        // return a promise
        return deferred.promise;

    }

    function deleteRecipeOfUser(userId) {
        /*
        for(var r = 0; r < mock.length; r++) {
            if(mock[r].userId == userId) {
                mock.splice(r,1);
                r--;
            }
        }
        return 1;
        */

        // use q to defer the response
        var deferred = q.defer();

        // remove removes all qualified documents
        RecipeModel.remove(

            // first argument is id
            { userId: userId },

            // doc is unique instance matches predicate
            function(err, docs) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(docs);
                }

            });

        // return a promise
        return deferred.promise;

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

        /*
        for(var r in mock) {
            if(mock[r]._id == recipeId) {
                mock[r].rating = rating;
                mock[r].rateImg = rateImg;
                return mock[r];
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        // find one retrieves one document
        RecipeModel.update(

            // first argument is id
            { _id: recipeId },

            // second argument is object to update
            { $set: { rating: rating, rateImg: rateImg} },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        // return a promise
        return deferred.promise;

    }

    function likeByUser(userId, recipeId) {
        /*
        for(var r in mock) {
            if(mock[r]._id == recipeId) {
                mock[r].likeBy.push(userId);
                return mock[r];
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        // insert userId with mongoose recipe model's findById
        RecipeModel.findById(recipeId, function (err, recipe) {
            if (!err) {
                if(recipe) {
                    recipe.likeBy.push(userId);
                    recipe.save(function (err) {
                        if (!err) {
                            deferred.resolve(recipe);
                        } else {
                            deferred.reject(err);
                        }
                    });
                } else {
                    deferred.resolve(recipe);
                }
            } else {
                // reject promise if error
                deferred.reject(err);
            }
        });

        // return a promise
        return deferred.promise;

    }

    function unlikeByUser(userId, recipeId) {
        /*
        for(var r in mock) {
            if(mock[r]._id == recipeId) {
                for(var l in mock[r].likeBy) {
                    if(mock[r].likeBy[l] == userId) {
                        mock[r].likeBy.splice(l,1);
                        return mock[r];
                    }
                }
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        // remove userId with mongoose recipe model's update
        RecipeModel.update(
            { _id: recipeId },
            { $pull: { likeBy: userId } },
            { multi: true },
            function (err, numAffected) {
                if (!err) {
                    deferred.resolve(numAffected)
                } else {
                    // reject promise if error
                    deferred.reject(err);
                }
            });

        // return a promise
        return deferred.promise;

    }

    function findAllLikedRecipesForUser(likedRecipes) {
        /*
        var ret_recipes = [];
        for(var r in likedRecipes) {
            var recipe = findRecipeById(likedRecipes[r]);
            if(recipe) {
                ret_recipes.push(recipe);
            }
        }
        return ret_recipes;
        */

        // use q to defer the response
        var deferred = q.defer();

        // find retrieves all qualified documents
        RecipeModel.find(

            // first argument is predicate
            { _id: { $in: likedRecipes }},

            // doc is unique instance matches predicate
            function(err, docs) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(docs);
                }

            });

        // return a promise
        return deferred.promise;

    }

    function findAllRecipesForStr(searchStr) {

        // use q to defer the response
        var deferred = q.defer();

        // find retrieves all qualified documents
        RecipeModel.find(

            // first argument is predicate
            { $or:[
                { title :            {$regex: searchStr, $options: 'six'}},
                { ingredientSpirit : {$regex: searchStr, $options: 'six'}},
                { ingredientOther :  {$regex: searchStr, $options: 'six'}},
                { step :             {$regex: searchStr, $options: 'six'}},
                { tag1 :             {$regex: searchStr, $options: 'six'}},
                { tag2 :             {$regex: searchStr, $options: 'six'}},
                { tag3 :             {$regex: searchStr, $options: 'six'}}
            ]},

            // doc is unique instance matches predicate
            function(err, docs) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(docs);
                }

            });

        // return a promise
        return deferred.promise;

    }

    function findAllRecipesForObj(searchObj) {
        //console.log(searchObj);
        // use q to defer the response
        var deferred = q.defer();

        var andTag1 = [];
        var andTag2 = [];

        searchObj.tag1.forEach(function(tag1) {
            andTag1.push({ "tag1": {$regex: tag1, $options: 'six'}})
        });
        searchObj.tag2.forEach(function(tag2) {
            andTag2.push({ "tag2": {$regex: tag2, $options: 'six'}})
        });

        if(searchObj.tag3.length == 1) {
            if(searchObj.tag3[0] == "") {
                searchObj.tag3 = ["beginner", "intermediate", "advanced"];
            }
        }


        RecipeModel.find(
            {
                "$and": [
                    {"$and": andTag1},
                    {"$and": andTag2},
                    {"tag3": {"$in": searchObj.tag3}}
                ]
            },
            // doc is unique instance matches predicate
            function(err, docs) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(docs);
                }

            });

        // return a promise
        return deferred.promise;
    }

    function deleteUserFromLikeBy(userId) {
        /*
        for(var r in mock) {
            for(var u in mock[r].likeBy) {
                if(mock[r].likeBy[u] == userId) {
                    mock[r].likeBy.splice(u,1);
                    return mock[r].likeBy;
                }
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        // remove userId with mongoose recipe model's update
        RecipeModel.update(
            {  },
            { $pull: { likeBy: userId } },
            { multi: true },
            function (err, numAffected) {
                if (!err) {
                    deferred.resolve(numAffected)
                } else {
                    // reject promise if error
                    deferred.reject(err);
                }
            });

        // return a promise
        return deferred.promise;

    }

    function updateRecipePic(recipeId, savePath, operation) {
        /*
        for(var r in mock) {
            if(mock[r]._id == recipeId) {
                if (operation == "delete") {
                    for (var i in mock[r].recipeImg) {
                        if (mock[r].recipeImg[i] == savePath) {
                            mock[r].recipeImg.splice(i, 1);
                            return mock[r].recipeImg;
                        }
                    }
                } else if (operation == "save") {
                    mock[r].recipeImg.push(savePath);
                    return mock[r].recipeImg;
                } else {
                    return null;
                }
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        if (operation == "save") {

            // insert savePath with mongoose user model's findById
            RecipeModel.findById(recipeId, function (err, recipe) {
                if (!err) {
                    if (recipe) {
                        recipe.recipeImg.push(savePath);
                        recipe.save(function (err) {
                            if (!err) {
                                deferred.resolve(recipe.recipeImg);
                            } else {
                                deferred.reject(err);
                            }
                        });
                    } else {
                        deferred.resolve(recipe);
                    }
                } else {
                    // reject promise if error
                    deferred.reject(err);
                }
            });

        } else if ( operation == "delete" ) {

            // remove recipeId with mongoose user model's update
            RecipeModel.update(
                { _id: recipeId },
                { $pull: { recipeImg: savePath } },
                { multi: true },
                function (err, numAffected) {
                    if (!err) {
                        deferred.resolve(numAffected)
                    } else {
                        // reject promise if error
                        deferred.reject(err);
                    }
                });

        } else {
            deferred.reject(err);
        }

        // return a promise
        return deferred.promise;

    }

    function completeTitle(title) {
        return RecipeModel.find({'title': {$regex: title, $options: 'i'}});
    }
};