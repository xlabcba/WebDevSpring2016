/**
 * Created by lixie on 16/3/16.
 */

// load mock forms data
//var mock = require("./form.mock.json");

// load guid
//var Guid = require("../js/guid.js");

// load q promise library
var q = require("q");

// pass db and mongoose reference to model
module.exports = function(db, mongoose) {

    // load field schema from field model
    //var FieldSchema = require("./field.schema.server.js")(mongoose);

    // load form schema from form model
    var FormSchema = require("./form.schema.server.js")(mongoose);

    // create movie from schema
    var FormModel  = mongoose.model("Form", FormSchema);

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
        /*
        var newForm = {
            _id: Guid.create(),//"ID_" + (new Date()).getTime(),
            title: form.title,
            userId: userId,
            fields: []  //?????
        };
        mock.push(newForm);
        return mock;
        */

        form.userId = userId;

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        FormModel.create(form, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        // return a promise
        return deferred.promise;
    }

    function findAllForms() {
        /*
        return mock;
        */

        var deferred = q.defer();

        // find one retrieves one document
        FormModel.find(

            // first argument is predicate
            {},

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function findAllFormsForUser(userId) {
        /*
        var ret_forms = [];
        for(var f in mock) {
            if(mock[f].userId == userId) {
                ret_forms.push(mock[f]);
            }
        }
        return ret_forms;
        */

        var deferred = q.defer();

        // find one retrieves one document
        FormModel.find(

            // first argument is predicate
            { userId: userId },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function findFormById(formId) {
        /*
        for(var f in mock) {
            if(mock[f]._id == formId) {
                return mock[f];
            }
        }
        return null;
        */

        var deferred = q.defer();

        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }

    function findFormByTitle(formTitle) {
        /*
        for(var f in mock) {
            if(mock[f].title == formTitle) {
                return mock[f];
            }
        }
        return null;
        */

        var deferred = q.defer();

        // find one retrieves one document
        FormModel.findOne(

            // first argument is predicate
            { title: formTitle },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function updateFormById(formId, newForm) {
        /*
        for(var f in mock) {
            if(mock[f]._id == formId) {
                mock.splice(f,1,newForm);
                return mock;
            }
        }
        return null;
        */

        var deferred = q.defer();

        // find one retrieves one document
        FormModel.update(

            // first argument is id
            { _id: formId },

            // second argument is object to update
            { $set: { title: newForm.title }},

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function deleteFormById(formId) {
        /*
        for(var f in mock) {
            if(mock[f]._id == formId) {
                mock.splice(f,1);
                return mock;
            }
        }
        return null;
        */

        var deferred = q.defer();

        // find one retrieves one document
        FormModel.remove(

            // first argument is id
            { _id: formId },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function findAllFieldsForForm(formId) {
        /*
        for(var f in mock) {
            if(mock[f]._id == formId) {
                return mock[f].fields;
            }
        }
        return null;
        */

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        FormModel.findById(formId, function (err, form) {
            if (!err) {
                if(form) {
                    deferred.resolve(form.fields);
                } else {
                    deferred.resolve(form);
                }
            } else {
                // reject promise if error
                deferred.reject(err);
            }
        });

        // return a promise
        return deferred.promise;

    }

    function findFieldById(formId, fieldId) {
        /*
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
        */

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        FormModel.findById(formId, function (err, form) {
            if (!err) {
                if(form) {
                    var field = form.fields.id(fieldId);
                    deferred.resolve(field);
                } else {
                    deferred.resolve(form);
                }
            } else {
                // reject promise if error
                deferred.reject(err);
            }
        });

        // return a promise
        return deferred.promise;

    }

    function deleteFieldById(formId, fieldId) {
        /*
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
        */

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        FormModel.findById(formId, function (err, form) {
            if (!err) {
                if(form) {
                    form.fields.id(fieldId).remove();
                    form.save(function (err) {
                        if (!err) {
                            deferred.resolve(form.fields);
                        } else {
                            deferred.reject(err);
                        }
                    });
                } else {
                    deferred.resolve(form);
                }
            } else {
                // reject promise if error
                deferred.reject(err);
            }
        });

        // return a promise
        return deferred.promise;

    }

    function createFieldForForm(formId, field) {
        /*
        field._id = Guid.create();
        for(var fm in mock) {
            if(mock[fm]._id == formId) {
                mock[fm].fields.push(field);
                return mock[fm].fields;
            }
        }
        return null
        */

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        FormModel.findById(formId, function (err, form) {
            if (!err) {
                if(form) {
                    form.fields.push(field);
                    form.save(function (err) {
                        if (!err) {
                            deferred.resolve(form.fields);
                        } else {
                            deferred.reject(err);
                        }
                    });
                } else {
                    deferred.resolve(form);
                }
            } else {
                // reject promise if error
                deferred.reject(err);
            }
        });

        // return a promise
        return deferred.promise;

    }

    function updateFieldById(formId, fieldId, field) {
        /*
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
        */

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        FormModel.findById(formId, function (err, form) {
            if (!err) {
                if(form) {
                    var oldField = form.fields.id(fieldId);
                    oldField.label = field.label;
                    oldField.placeholder = field.placeholder;
                    oldField.options = field.options;
                    form.save(function (err) {
                        if (!err) {
                            deferred.resolve(form.fields);
                        } else {
                            deferred.reject(err);
                        }
                    });
                } else {
                    deferred.resolve(form);
                }
            } else {
                // reject promise if error
                deferred.reject(err);
            }
        });

        // return a promise
        return deferred.promise;

    }

    function updateFieldsForForm(formId, fields) {
        /*
        for(var fm in mock) {
            if(mock[fm]._id == formId) {
                mock[fm].fields = fields;
                return mock[fm].fields;
            }
        }
        return null;\
        */

        // use q to defer the response
        var deferred = q.defer();

        // insert new user with mongoose user model's create()
        FormModel.findById(formId, function (err, form) {
            if (!err) {
                if(form) {
                    form.fields = fields;
                    form.save(function (err) {
                        if (!err) {
                            deferred.resolve(form.fields);
                        } else {
                            deferred.reject(err);
                        }
                    });
                } else {
                    deferred.resolve(form);
                }
            } else {
                // reject promise if error
                deferred.reject(err);
            }
        });

        // return a promise
        return deferred.promise;

    }

};