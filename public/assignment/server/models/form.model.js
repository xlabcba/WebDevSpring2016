/**
 * Created by lixie on 16/3/16.
 */

// load mock forms data
var mock = require("./form.mock.json");
var Guid = require("../js/guid.js");

module.exports = function() {

    var api = {
        createFormForUser: createFormForUser,
        findAllForms: findAllForms,
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById,
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldById: findFieldById,
        deleteFieldById: deleteFieldById,
        createFieldForForm: createFieldForForm,
        updateFieldById: updateFieldById,
        updateFieldsForForm: updateFieldsForForm
    };
    return api;

    function createFormForUser(userId, form) {
        var newForm = {
            _id: Guid.create(),//"ID_" + (new Date()).getTime(),
            title: form.title,
            userId: userId,
            fields: []  //?????
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
            if(mock[f]._id == formId) {
                return mock[f];
            }
        }
        return null;
    }

    function findFormByTitle(formtTitle) {
        for(var f in mock) {
            if(mock[f].title == formtTitle) {
                return mock[f];
            }
        }
        return null;
    }

    function updateFormById(formId, newForm) {
        for(var f in mock) {
            if(mock[f]._id == formId) {
                mock.splice(f,1,newForm);
                return mock;
            }
        }
        return null;
    }

    function deleteFormById(formId) {
        for(var f in mock) {
            if(mock[f]._id == formId) {
                mock.splice(f,1);
                return mock;
            }
        }
        return null;
    }

    function findAllFieldsForForm(formId) {
        for(var f in mock) {
            if(mock[f]._id == formId) {
                return mock[f].fields;
            }
        }
        return null;
    }

    function findFieldById(formId, fieldId) {
        for(var fm in mock) {
            if(mock[fm]._id == formId) {
                for(var fd in mock[fm].fields) {
                    if(mock[fm].fields[fd]._id == fieldId) {
                        return mock[fm].fields[fd]
                    }
                }
            }
        }
        return null;
    }

    function deleteFieldById(formId, fieldId) {
        for(var fm in mock) {
            if(mock[fm]._id == formId) {
                for(var fd in mock[fm].fields) {
                    if(mock[fm].fields[fd]._id == fieldId) {
                        mock[fm].fields.splice(fd,1);
                        return mock[fm].fields;
                    }
                }
            }
        }
        return null;
    }

    function createFieldForForm(formId, field) {
        field._id = Guid.create();
        for(var fm in mock) {
            if(mock[fm]._id == formId) {
                mock[fm].fields.push(field);
                return mock[fm].fields;
            }
        }
        return null
    }

    function updateFieldById(formId, fieldId, field) {
        for(var fm in mock) {
            if(mock[fm]._id == formId) {
                for(var fd in mock[fm].fields) {
                    if(mock[fm].fields[fd]._id == fieldId) {
                        mock[fm].fields.splice(fd,1,field);
                        return mock[fm].fields;
                    }
                }
            }
        }
        return null;
    }

    function updateFieldsForForm(formId, fields) {
        for(var fm in mock) {
            if(mock[fm]._id == formId) {
                mock[fm].fields = fields;
                return mock[fm].fields;
            }
        }
        return null;
    }

};