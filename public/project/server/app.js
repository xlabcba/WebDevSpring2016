module.exports = function(app, db, mongoose, userModelProj) {

    //var userModelProj    = require("./models/user.model");
    var recipeModel   = require("./models/recipe.model.js")(db, mongoose);
    var commentModel   =  require("./models/comment.model.js")(db, mongoose, recipeModel);

    var userService  = require("./services/user.service.server.js") (app, userModelProj, recipeModel, commentModel);
    var recipeService = require("./services/recipe.service.server.js")(app, userModelProj, recipeModel, commentModel);
    var commentService = require("./services/comment.service.server.js")(app, userModelProj, recipeModel, commentModel);
};