/**
 * Created by lixie on 16/3/16.
 */

// load mock forms data
var mock = require("./form.mock.json");

module.exports = function() {

    var api = {
        createFormForUser: createFormForUser,
        findAllForms: findAllForms,
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById
    };
    return api;

    function createFormForUser(userId, form) {
        var newForm = {
            _id: "ID_" + (new Date()).getTime(),
            title: form.title,
            userId: userId,
            fields: form.fields
        };
        mock.push(newForm);
        return mock;
    }

    function findAllForms() {
        return mock;
    }

    function findAllFormsForUser(userId) {
        var ret_forms = [];
        for(var f in mock) {
            if(mock[f].userId == userId) {
                ret_forms.push(mock[f]);
            }
        }
        return ret_forms;
    }

    function findFormById(formId) {
        for(var f in mock) {
            if(mock[f]._id === formId) {
                return mock[f];
            }
        }
        return null;
    }

    function findFormByTitle(formtTitle) {
        for(var f in mock) {
            if(mock[f].title === formtTitle) {
                return mock[f];
            }
        }
        return null;
    }

    function updateFormById(formId, newForm) {
        for(var f in mock) {
            if(mock[f]._id === formId) {
                mock.splice(f,1,newForm);
                return mock;
            }
        }
        return null;
    }

    function deleteFormById(formId) {
        for(var f in mock) {
            if(mock[f]._id === formId) {
                mock.splice(f,1);
                return mock;
            }
        }
        return null;
    }

};