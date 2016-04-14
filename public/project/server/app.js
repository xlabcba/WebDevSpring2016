module.exports = function(app, fs, path) {

    var userModel    = require("./models/user.model.js")();
    var recipeModel   = require("./models/recipe.model.js")();
    var commentModel   =  require("./models/comment.model.js")(recipeModel);

    var userService  = require("./services/user.service.server.js") (app, fs, path, userModel, recipeModel, commentModel);
    var recipeService = require("./services/recipe.service.server.js")(app, userModel, recipeModel, commentModel);
    var commentService = require("./services/comment.service.server.js")(app, userModel, recipeModel, commentModel);
};