/**
 * Created by lixie on 16/2/17.
 */

(function(){
    angular
        .module("DataModelApp")
        .factory("FormService", FormService);

    function FormService() {
        var forms = [];

        forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;

        function createFormForUser(userId, form, callback) {
            var d = new Date();
            var n = d.getTime();
            form._id = n;
            form.userId = userId;
            forms.push(form);
            callback(form);
            return;

        }

        function findAllFormsForUser(userId, callback) {
            var ret_forms = [];
            for(var i=0; i<forms.length; i++)
            {
                if(forms[i].userId === userId)
                {
                    ret_forms.push(forms[i]);
                }
            }
            callback(ret_forms);
            return;
        }

        function deleteFormById(formId, callback) {
            for(var i=0; i<forms.length; i++)
            {
                if(forms[i]._id === formId)
                {
                    forms.splice(i,1);
                    callback(forms);
                    break;
                }
            }
            return;
        }

        function updateFormById(formId, newForm, callback) {
            for(var i=0; i<forms.length; i++)
            {
                if(forms[i]._id === formId)
                {
                    forms.splice(i,1,newForm);
                    callback(forms[i]);
                    break;
                }
            }
            return;
        }
    }
})();
