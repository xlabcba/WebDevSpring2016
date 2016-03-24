module.exports = function(app) {
    var userModel    = require("./models/user.model.js")();
    var recipeModel   = require("./models/recipe.model.js")();

    var userService  = require("./services/user.service.server.js") (app, userModel);
    var recipeService = require("./services/reicpe.service.server.js")(app, recipeModel);
    var commentService = require("./services/comment.service.server.js")(app, recipeModel);
}