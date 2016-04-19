/**
 * Created by lixie on 16/3/16.
 */

module.exports = function(app, db, mongoose, userModelProj) {
    var userModel     = require("./models/user.model.js")(db, mongoose);
    var formModel     = require("./models/form.model.js")(db, mongoose);
    //var userModelProj = require("../../project/server/models/user.model");

    var userService  = require("./services/user.service.server.js") (app, userModel, userModelProj);
    var formService = require("./services/form.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel);
};