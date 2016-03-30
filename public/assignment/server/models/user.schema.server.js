module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: {type: String, default: ""},
        lastName: {type: String, default: ""},
        roles: {type: [String], default:[]},
        emails: {type: [String], default:[]},
        phones: {type: [String], default:[]}
    }, {collection: 'project.user'});

    return UserSchema;

};