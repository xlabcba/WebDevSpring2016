/**
 * Created by lixie on 16/3/24.
 */

// load mock forms data
// var mock = require("./comment.mock.json");
// var Guid = require("../js/guid.js");

// load q promise library
var q = require("q");

// load round Library
var round = require("mongo-round");

module.exports = function(db, mongoose, recipeModel) {

    // load comment schema from comment model
    var CommentSchema = require("./comment.schema.server.js")(mongoose);

    // create comment from schema
    var CommentModel  = mongoose.model("projectComment", CommentSchema);

    var api = {

        createCommentForUser: createCommentForUser,
        findAllComments: findAllComments,
        findAllCommentsForUser: findAllCommentsForUser,
        findAllCommentsForRecipe: findAllCommentsForRecipe,
        findCommentById: findCommentById,
        deleteCommentById: deleteCommentById,
        updateCommentById: updateCommentById,
        deleteCommentOfRecipe: deleteCommentOfRecipe,
        deleteCommentOfUser: deleteCommentOfUser,
        calculateRatingForRecipe: calculateRatingForRecipe,
        updateCommentedRecipeForUser: updateCommentedRecipeForUser,
        findCommentedRecipeForUser: findCommentedRecipeForUser
    };
    return api;

    function createCommentForUser(userId, recipeId, comment) {
        /*
        var newComment = {
            _id: Guid.create(), //"ID_" + (new Date()).getTime(),
            userId: userId,
            recipeId: recipeId,
            title: comment.title,
            rating: comment.rating,
            rateImg: comment.rateImg,
            content: comment.content
        };
        mock.push(newComment);
        var rating = calculateRating(recipeId);
        recipeModel.updateRating(recipeId, rating);
        return mock;
        */

        //console.log("creating new comment");

        comment.userId = userId;
        comment.recipeId = recipeId;

        // use q to defer the response
        var deferred = q.defer();

        // insert new comment with mongoose comment model's create()
        CommentModel.create(comment, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
                /*
                console.log(doc);
                console.log("going to aggregate");
                calculateRatingForRecipe(recipeId)
                    .then(
                        function ( doc ) {
                            console.log("solved");
                            deferred.resolve(doc);
                        },
                        function ( err ) {
                            console.log("fail");
                            deferred.reject(err);
                        });
                        */
            }

        });

        // return a promise
        return deferred.promise;

    }

    function findAllComments() {
        /*
        return mock;
        */

        // use q to defer the response
        var deferred = q.defer();

        // find retrieves all qualified document
        CommentModel.find(

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

    function findAllCommentsForUser(userId) {
        /*
        var ret_comments = [];
        for(var c in mock) {
            if(mock[c].userId == userId) {
                ret_comments.push(mock[c]);
            }
        }
        return ret_comments;
        */

        // use q to defer the response
        var deferred = q.defer();

        // find retrieves all qualified documents
        CommentModel.find(

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

    function findAllCommentsForRecipe(recipeId) {
        /*
        var ret_comments = [];
        for(var c in mock) {
            if(mock[c].recipeId == recipeId) {
                ret_comments.push(mock[c]);
            }
        }
        return ret_comments;
        */

        // use q to defer the response
        var deferred = q.defer();

        // find retrieves all qualified documents
        CommentModel.find(

            // first argument is predicate
            { recipeId: recipeId },

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

    function findCommentById(commentId) {
        /*
        for(var c in mock) {
            if(mock[c]._id == commentId) {
                return mock[c];
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        // find by id retrieves one document by id
        CommentModel.findById(commentId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        // return a promise
        return deferred.promise;

    }

    function deleteCommentById(commentId) {

        // TODO: CHANGE

        /*
        for(var c in mock) {
            if(mock[c]._id == commentId) {
                var recipeId = mock[c].recipeId;
                mock.splice(c,1);
                var newRating = calculateRating(recipeId);
                recipeModel.updateRating(recipeId, newRating);
                return mock;
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        // find by id retrieves one document by id
        CommentModel.findById(commentId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                var recipeId = doc.recipeId;
                // find one retrieves one document
                CommentModel.remove(

                    // first argument is id
                    { _id: commentId },

                    // doc is unique instance matches predicate
                    function(err, doc) {

                        if (err) {
                            // reject promise if error
                            deferred.reject(err);
                        } else {
                            deferred.resolve(recipeId);
                        }
                    });
                deferred.resolve(doc);
            }
        });

        // return a promise
        return deferred.promise;

    }

    function updateCommentById(commentId, newComment) {

        // TODO: CHANGE

        /*
        for(var c in mock) {
            if(mock[c]._id == commentId) {
                mock.splice(c,1,newComment);
                var newRating = calculateRating(newComment.recipeId);
                recipeModel.updateRating(newComment.recipeId, newRating);
                return mock;
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        // find one retrieves one document
        CommentModel.update(

            // first argument is id
            { _id: commentId },

            // second argument is object to update
            { $set: newComment },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                    /*
                    calculateRatingForRecipe(newComment.recipeId)
                        .then(
                            function ( doc ) {
                                deferred.resolve(doc);
                            },
                            function ( err ) {
                                deferred.reject(err);
                            });
                            */
                }

            });

        // return a promise
        return deferred.promise;

    }

    function deleteCommentOfRecipe(recipeId) {

        // TODO: CHANGE

        /*
        for(var c = 0; c < mock.length; c++) {
            if(mock[c].recipeId == recipeId) {
                mock.splice(c,1);
                c--;
            }
        }
        var newRating = calculateRating(recipeId);
        recipeModel.updateRating(recipeId, newRating);
        return 1;
        */

        // use q to defer the response
        var deferred = q.defer();

        // remove removes all qualified documents
        CommentModel.remove(

            // first argument is id
            { recipeId: recipeId },

            // doc is unique instance matches predicate
            function(err, docs) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    deferred.resolve(docs);
                    /*
                    calculateRatingForRecipe(recipeId)
                        .then(
                            function ( doc ) {
                                deferred.resolve(doc);
                            },
                            function ( err ) {
                                deferred.reject(err);
                            });
                            */
                }

            });

        // return a promise
        return deferred.promise;

    }

    function deleteCommentOfUser(userId, recipeArray) {

        // TODO: CHANGE

        /*
        for(var c = 0; c < mock.length; c++) {
            if(mock[c].userId == userId) {
                var recipeId = mock[c].recipeId;
                mock.splice(c,1);
                c--;
                var newRating = calculateRating(recipeId);
                recipeModel.updateRating(recipeId, newRating);
            }
        }
        return 1;
        */

        // use q to defer the response
        var deferred = q.defer();

        // remove removes all qualified documents
        CommentModel.remove(

            // first argument is id
            { userId: userId },

            // doc is unique instance matches predicate
            function(err, docs) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    deferred.resolve(recipeArray);
                    /*
                    calculateRatingForUser(userId)
                        .then(
                            function ( doc ) {
                                deferred.resolve(doc);
                            },
                            function ( err ) {
                                deferred.reject(err);
                            });
                            */
                }

            });

        // return a promise
        return deferred.promise;

    }


    function calculateRatingForRecipe(recipeId) {

        // TODO: CHANGE


        /*
        var sum = 0;
        var count = 0;
        var rating = 0;

        for(var c in mock) {
            if(mock[c].recipeId == recipeId) {
                sum = sum + parseInt(mock[c].rating);
                count = count + 1;
            }
        }

        rating = Math.round(sum / count);
        return rating;
        */


        // use q to defer the response
        var deferred = q.defer();

        //console.log("here aggregate for recipe");
        //console.log(recipeId);

        CommentModel
            .aggregate(
                [
                    { $match: { recipeId: mongoose.Types.ObjectId(recipeId) } },
                    {
                        $group : {
                            _id : "$recipeId",
                            recipe_avg_rating: { $avg: "$rating" }
                        }
                    }
                ],
                (function(err, result) {
                    //console.log("result of aggregate for recipe");
                    //console.log(result);
                    //console.log(err);

                    if(!err) {
                        if(result.length == 1) {
                            recipeModel
                                .updateRating(result[0]._id, Math.round(result[0].recipe_avg_rating))
                                .then(
                                    function ( doc ) {
                                        deferred.resolve(doc);
                                    },
                                    function ( err ) {
                                        deferred.reject(err);
                                    });
                        } else {
                            recipeModel
                                .updateRating(recipeId, 0)
                                .then(
                                    function ( doc ) {
                                        deferred.resolve(doc);
                                    },
                                    function ( err ) {
                                        deferred.reject(err);
                                    });
                        }
                    } else {
                        deferred.reject(err);
                    }

                })
            );

        // return a promise
        return deferred.promise;

    }


    function updateCommentedRecipeForUser(recipeArray) {

        // TODO: CHANGE

        var deferred = q.defer();
        var done = 0;

        recipeArray.forEach(
            function(recipe){
                calculateRatingForRecipe(recipe._id);
                done++;
                if(done = recipeArray.length) {
                    deferred.resolve(done);
                }
            }
        );

        return deferred.promise;

        /*
         var sum = 0;
         var count = 0;
         var rating = 0;

         for(var c in mock) {
         if(mock[c].recipeId == recipeId) {
         sum = sum + parseInt(mock[c].rating);
         count = count + 1;
         }
         }

         rating = Math.round(sum / count);
         return rating;
         */

        /*
        // use q to defer the response
        var deferred = q.defer();

        CommentModel
            .aggregate(
                [
                    { $match: { recipeId: { $in : recipeArray} } },
                    {
                        $group : {
                            _id : "$recipeId",
                            recipe_avg_rating: { $avg: "$rating" }
                        }
                    }
                ],
                (function(err, result) {
                    if (!err) {
                        console.log(result);

                        if(result.length > 0){

                            var done = 0;
                            for (var r in result) {
                                (function() {
                                    var i = r;
                                    recipeModel
                                        .updateRating(result[i]._id, Math(result[i].recipe_avg_rating))
                                        .then(
                                            function ( doc ) {
                                                done++;
                                                if(done == result.length) {
                                                    deferred.resolve(result);
                                                }
                                            },
                                            function ( err ) {
                                                deferred.reject(err);
                                            });
                                })();
                            }

                        } else {
                            deferred.resolve(result);
                        }

                    } else {
                        deferred.reject(err);
                    }

                })
            );

        // return a promise
        return deferred.promise;
        */

    }

    function findCommentedRecipeForUser(userId) {

        // TODO: CHANGE

        /*
         var sum = 0;
         var count = 0;
         var rating = 0;

         for(var c in mock) {
         if(mock[c].recipeId == recipeId) {
         sum = sum + parseInt(mock[c].rating);
         count = count + 1;
         }
         }

         rating = Math.round(sum / count);
         return rating;
         */

        // use q to defer the response
        var deferred = q.defer();

        CommentModel
            .aggregate(
                [
                    { $match: { userId: mongoose.Types.ObjectId(userId) } },
                    {
                        $group : {
                            _id : "$recipeId"
                        }
                    }
                ],
                (function(err, result) {

                    if(result){
                        deferred.resolve(result);
                    } else {
                        deferred.reject(err);
                    }
                })
            );

        // return a promise
        return deferred.promise;

    }

};