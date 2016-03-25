module.exports = function(app) {
    var userModel    = require("./models/user.model.js")(recipeModel, commentModel);
    var recipeModel   = require("./models/recipe.model.js")(userModel, commentModel);
    var commentModel   =  require("./models/comment.model/js")(recipeModel);

    var userService  = require("./services/user.service.server.js") (app, userModel);
    var recipeService = require("./services/reicpe.service.server.js")(app, userModel, recipeModel);
    var commentService = require("./services/comment.service.server.js")(app, commentModel);
};