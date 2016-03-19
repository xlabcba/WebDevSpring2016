/**
 * Created by lixie on 16/2/17.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($rootScope, $scope, FieldService, FormService, $routeParams) {

        var vm = this;

        var formId = $routeParams.formId;

        vm.options = [
            {"label":"Single Line Text Field",
                "value":{"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"}},
            {"label":"Multi Line Text Field",
                "value":{"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"}},
            {"label":"Date Field",
                "value":{"_id": null, "label": "New Date Field", "type": "DATE"}},
            {"label":"Dropdown Field",
                "value": {"_id": null, "label": "New Dropdown", "type": "OPTIONS",
                    "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                }
            },
            {"label":"Checkboxes Field",
                "value": {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES",
                    "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                }
            },
            {
                "label": "Radio Buttons Field",
                "value": {
                    "_id": null, "label": "New Radio Buttons", "type": "RADIOS",
                    "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                }
            }
        ];



        vm.addField = addField;
        vm.removeField = deleteField;
        vm.updateFields = updateFields;
        vm.setCurrField = setCurrField;
        vm.editField = editField;

        function init() {
            vm.curField = null;
            vm.currForm = null;
            vm.modalfield = {"label":"","content":""};
            FormService
                .getFormById(formId)
                .then(function(response){
                    vm.currForm = response.data;
                });
            FieldService
                .getFieldsForForm(formId)
                .then(function(response){
                    vm.fields = response.data;
                });
        }
        init();

        function addField(fieldType) {
            console.log(fieldType);
            FieldService
                .createFieldForForm(formId, fieldType)
                .then(function(response){
                    vm.fields = response.data;
                    console.log(vm.fields);
                });
        }

        function deleteField(field) {
            console.log(field);
            FieldService
                .deleteFieldFromForm(formId, field._id)
                .then(function(response){
                    vm.fields = response.data;
                });
        }

        function updateFields(fields) {
            FieldService
                .updateFields(formId, fields)
                .then(function(response){
                    vm.fields = response.data;
                });
        }
        function setCurrField(field) {
            vm.curField = field;
            vm.modalfield.label = field.label;
            if(field.type=="TEXT"||field.type=="TEXTAREA"||field.type=="EMAIL"){
                vm.modalfield.content = field.placeholder;
            }else if(field.type=="DATE"){
                vm.modalfield.content = "";
            }else if(field.type=="CHECKBOXES"||field.type=="OPTIONS"||field.type=="RADIOS"){
                vm.modalfield.content ="";
                for(var i in field.options){
                    vm.modalfield.content += field.options[i].label +":"+field.options[i].value+"\n";
                }
            }
        }

        function editField(){
            vm.curField.label = vm.modalfield.label;
            if(vm.curField.type=="TEXT"||vm.curField.type=="TEXTAREA"||vm.curField.type=="EMAIL"){
                vm.curField.placeholder = vm.modalfield.content;
            }else if(vm.curField.type=="CHECKBOXES"||vm.curField.type=="OPTIONS"||vm.curField.type=="RADIOS"){
                vm.curField.options = [];
                var options = vm.modalfield.content.split("\n");
                for(var i in options){
                    var item = options[i].split(":");
                    if(item.length==2){
                        vm.curField.options.push({"label":item[0],"value":item[1]});
                    }
                }
            }
            FieldService
                .updateField(formId, vm.curField._id, vm.curField)
                .then(function(response){
                    vm.fields = response.data;
                });
        }

    }
})();