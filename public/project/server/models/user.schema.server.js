module.exports = function(mongoose) {

    var Schema = mongoose.Schema;
    // use mongoose to declare a recipe schema
    var UsersSchema = mongoose.Schema({

        "photo": String,
        "gender": {type: String, enum: ["Male", "Female"]},
        "firstName": {type: String, default: ""},
        "lastName": {type: String, default: ""},
        "username": String,
        "password": String,
        "email": {type: String, default: ""},
        "birthday": Date,
        "follow": {type: [Schema.ObjectId], default: []},
        "followBy": {type: [Schema.ObjectId], default: []},
        "like": {type: [Schema.ObjectId], default: []},
        "intro": {type: String, default: ""},
        "roles": {type: [String], default: []},
        "created": {type: Date, default: Date.now}

    }, {collection: 'projectUser'});

    return UsersSchema;

};