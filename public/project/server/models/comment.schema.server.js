module.exports = function(mongoose) {

    var Schema = mongoose.Schema;
    // use mongoose to declare a comment schema
    var CommentSchema = mongoose.Schema({

        "userId": Schema.ObjectId,
        "recipeId": Schema.ObjectId,
        "title": String,
        "rating": {type: Number, enum: [0, 1, 2, 3, 4, 5], default: 0},
        "rateImg": {
            type: String,
            enum: ["./images/star0.png", "./images/star1.png", "./images/star2.png",
                "./images/star3.png", "./images/star4.png", "./images/star5.png"],
            default: "./images/star0.png"
        },
        "content": String,
        "created": {type: Date, default: Date.now},
        "updated": {type: Date, default: Date.now}

    }, {collection: 'projectComment'});

    return CommentSchema;

};