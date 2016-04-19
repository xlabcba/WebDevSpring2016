(function()
{
    angular
        .module("RecipeApp")
        .controller("EditController", EditController);

    function EditController($scope, $location, $routeParams, UserService, RecipeService)
    {
        var vm = this;

        vm.currRecipeId = $routeParams.recipeId;

        vm.addBase = addBase;
        vm.deleteBase = deleteBase;
        vm.addFlavor = addFlavor;
        vm.deleteFlavor = deleteFlavor;
        vm.addLiquorIngredient = addLiquorIngredient;
        vm.deleteLiquorIngredient = deleteLiquorIngredient;
        vm.addOtherIngredient = addOtherIngredient;
        vm.deleteOtherIngredient = deleteOtherIngredient;
        vm.addStep = addStep;
        vm.deleteStep = deleteStep;
        vm.saveRecipe = saveRecipe;
        vm.deleteImage = deleteImage;

        if(vm.currRecipeId) {
            init()
        } else {
            vm.currUser = UserService.getCurrentUser();
            vm.currRecipe = {
                userId: vm.currUser._id,
                title: null,
                recipeImg: [],
                rating: "0",
                rateImg: "./images/star0.png",
                likeBy: [],
                tag1: [],
                tag2: [],
                tag3: "beginner",
                ingredientSpirit: [],
                ingredientOther: [],
                step: [],
                overview: null
            };
        }

        function init() {
            vm.currUser = UserService.getCurrentUser();
            vm.currRecipe = {};
            RecipeService
                .getRecipeById(vm.currRecipeId)
                .then(function(response){
                    vm.currRecipe = response.data;
                });
        }

        function addBase() {
            vm.currRecipe.tag1.push(null);
        }

        function deleteBase(index) {
            vm.currRecipe.tag1.splice(index, 1);
        }

        function addFlavor() {
            vm.currRecipe.tag2.push(null);
        }

        function deleteFlavor(index) {
            vm.currRecipe.tag2.splice(index, 1);
        }

        function addLiquorIngredient() {
            vm.currRecipe.ingredientSpirit.push(null);
        }

        function deleteLiquorIngredient(index) {
            vm.currRecipe.ingredientSpirit.splice(index, 1);
        }

        function addOtherIngredient() {
            vm.currRecipe.ingredientOther.push(null);
        }

        function deleteOtherIngredient(index) {
            vm.currRecipe.ingredientOther.splice(index, 1);
        }

        function addStep() {
            vm.currRecipe.step.push(null);
        }

        function deleteStep(index) {
            vm.currRecipe.step.splice(index, 1);
        }

        function saveRecipe(currRecipe) {

            if (!currRecipe.title) {
                alert("title cannot be empty!");
                return;
            }
            if (!currRecipe.overview) {
                alert("overview cannot be empty!");
                return;
            }

            vm.newBases = [];
            vm.newFlavors = [];
            vm.newLiquorIngredients = [];
            vm.newOtherIngredients = [];
            vm.newSteps = [];

            vm.newBases = vm.currRecipe.tag1.filter(function(val) {return (val !== null && val !== undefined);});
            vm.newFlavors = vm.currRecipe.tag2.filter(function(val) {return (val !== null && val !== undefined);});
            vm.newLiquorIngredients = vm.currRecipe.ingredientSpirit.filter(function(val) {return (val !== null && val !== undefined);});
            vm.newOtherIngredients = vm.currRecipe.ingredientOther.filter(function(val) {return (val !== null && val !== undefined);});
            vm.newSteps = vm.currRecipe.step.filter(function(val) {return (val !== null && val !== undefined);});

            if (vm.newBases.length == 0) {
                alert("At least one base liquor is required!");
                return;
            }
            if (vm.newFlavors.length == 0) {
                alert("At least one flavor is required!");
                return;
            }
            if (vm.newLiquorIngredients.length == 0) {
                alert("At least one liquor as ingredient is required!");
                return;
            }
            if (vm.newSteps.length == 0) {
                alert("At least one step iis required!");
                return;
            }

            var newRecipe = {
                _id: vm.currRecipeId,
                userId: currRecipe.userId,
                title: currRecipe.title,
                titleImg: currRecipe.titleImg,
                recipeImg: currRecipe.recipeImg,
                rating: currRecipe.rating,
                likeBy: currRecipe.likeBy,
                tag1: vm.newBases,
                tag2: vm.newFlavors,
                tag3: currRecipe.tag3,
                ingredientSpirit: vm.newLiquorIngredients,
                ingredientOther: vm.newOtherIngredients,
                step: vm.newSteps,
                overview: currRecipe.overview,
                created: currRecipe.created,
                updated: Date.now()
            };

            if(!newRecipe._id) {
                RecipeService
                    .createRecipeForUser(vm.currUser._id, newRecipe)
                    .then(function(response){
                        console.log("success create recipe");
                        console.log(response.data);
                        $location.url("/recipe/"+response.data._id);
                    })
            } else {
                RecipeService
                    .updateRecipeById(vm.currRecipeId, newRecipe)
                    .then(function(response ){
                        console.log("success update recipe");
                        console.log(response.data);
                        $location.url("/recipe/"+vm.currRecipeId);
                    });
            }
        }

        function deleteImage(recipeId, savePath) {
            var strArray = savePath.split("/");
            var fileName = strArray[strArray.length - 1];
            RecipeService
                .deleteRecipeImage(recipeId, fileName)
                .then(function(response){
                    RecipeService
                        .getRecipeById(vm.currRecipeId)
                        .then(function(response){
                            vm.currRecipe.recipeImg = response.data.recipeImg;
                        });
                })
        }

    }
})();