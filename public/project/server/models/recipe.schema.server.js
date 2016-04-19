module.exports = function(mongoose) {

    var Schema = mongoose.Schema;
    // use mongoose to declare a recipe schema
    var RecipeSchema = mongoose.Schema({

        "userId": Schema.ObjectId,
        "title": String,
        "recipeImg":{type: [String], default: []},
        "rating": {type: Number, enum: [0, 1, 2, 3, 4, 5], default: 0},
        "rateImg": {
            type: String,
            enum: ["./images/star0.png", "./images/star1.png", "./images/star2.png",
                "./images/star3.png", "./images/star4.png", "./images/star5.png"],
            default: "./images/star0.png"
        },
        "likeBy":{type: [Schema.ObjectId], default: []},
        "tag1": {type: [String], default: []},
        "tag2": {type: [String], default: []},
        "tag3": {type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner"},
        "ingredientSpirit": {type: [String], default: []},
        "ingredientOther": {type: [String], default: []},
        "step": {type: [String], default: []},
        "overview": {type: String, default: ""},
        "created": {type: Date, default: Date.now},
        "updated": {type: Date, default: Date.now}

    }, {collection: 'projectRecipe'});

    return RecipeSchema;

};