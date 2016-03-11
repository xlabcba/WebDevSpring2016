/**
 * Created by lixie on 16/3/9.
 */

(function(){
    angular
        .module("DataModelApp")
        .factory("RecipeService", RecipeService);

    function RecipeService() {
        var recipes = [];

        recipes = [
            {
                "_id": "000", "userId": 123, "title": "Cosmo",
                "tag1": ["Vodka"], "tag2": ["sweet"], "tag3": "beginner",
                "ingredientSpirit": ["1 1/2 parts Vodka", "Splash Triple Sec Liqueur"],
                "ingredientOther": ["2 parts Cranberry Juice", "Splash Lime Juice", "Lime Wedges", "Cranberries"],
                "step": ["Shake with ice", "Pour into a martini glass", "Garnish with fresh lime wedge or cranberries"],
                "comment": ["001", "002"]
            },
            {
                "_id": "010", "userId": 123, "title": "Bloody Mary",
                "tag1": ["Vodka"], "tag2": ["savory", "spicy"], "tag3": "intermediate",
                "ingredientSpirit": ["2 parts Cucumber Vodka"],
                "ingredientOther": ["Dash Hot Sauce", "2 parts Low-Sodium Tomato Juice", "Squeeze fresh Lemon Juice",
                    "Squeeze fresh Lime Juice", "Dash Worcestershire sauce", "Celery Salt", "Lime", "Cucumber, Sliced"],
                "step": ["Shake ingredients well in a three-piece shaker filled with ice", "Strain into a glass over ice",
                    "Garnish with lime, cucumber and a celery stalk", "Sprinkle with celery salt"],
                "comment": ["003"]
            },
            {
                "_id": "020", "userId": 234, "title": "Long Island Ice Tea",
                "tag1": ["Rum","Vodka","Gin"], "tag2": ["sweet"], "tag3": "advance",
                "ingredientSpirit": ["1/2 part Triple Sec Liqueur", "1/2 part Original Vodka", "1/2 part Aged Dark Rum",
                    "1/2 part Gin"],
                "ingredientOther": ["3 parts Sour Mix", "3 parts Cola"],
                "step": ["Fill a Collins glass 3/4 full with ice", "Add all ingredients except for the cola into a cocktail tin",
                    "Shake and pour into glass", " Add Cola"],
                "comment": []
            }
        ];

        var service = {
            createRecipeForUser: createRecipeForUser,
            findAllRecipes: findAllRecipes,
            findAllRecipesForUser: findAllRecipesForUser,
            deleteRecipeById: deleteRecipeById,
            updateRecipeById: updateRecipeById

            /*
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
            */
        };

        return service;

        function createRecipeForUser(userId, recipe, callback) {
            var d = new Date();
            var n = d.getTime();
            recipe._id = n;
            recipe.userId = userId;
            recipes.push(recipe);
            callback(recipe);
            return;

        }

        function findAllRecipes(callback) {
            callback(recipes);
            return;
        }

        function findAllRecipesForUser(userId, callback) {
            var ret_recipes = [];
            for(var i=0; i<recipes.length; i++)
            {
                if(recipes[i].userId === userId)
                {
                    ret_recipes.push(recipes[i]);
                }
            }
            callback(ret_recipes);
            return;
        }

        function deleteRecipeById(recipeId, callback) {
            for(var i=0; i<recipes.length; i++)
            {
                if(recipes[i]._id === recipeId)
                {
                    recipes.splice(i,1);
                    callback(recipes);
                    break;
                }
            }
            return;
        }

        function updateRecipeById(recipeId, newRecipe, callback) {
            for(var i=0; i<recipes.length; i++)
            {
                if(recipes[i]._id === recipeId)
                {
                    recipes.splice(i,1,newRecipe);
                    callback(recipes[i]);
                    break;
                }
            }
            return;
        }
    }
})();