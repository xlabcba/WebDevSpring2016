/**
 * Created by lixie on 16/2/17.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($rootScope, $scope, FormService) {

        var vm = this;

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        var currUser = $rootScope.currentUser;

        function init() {
            FormService
                .findAllFormsForUser(currUser._id)
                .then(function(response){
                    vm.forms = response.data;
                });
            vm.currForm = {};
        }
        init();

        function addForm(form) {
            console.log(form);
            var newForm = {
                title: form.title,
                userId: currUser._id
            };
            console.log(newForm);
            FormService
                .createFormForUser(currUser._id, newForm)
                .then(function(response){
                    console.log(response.data);
                    init();
                });
        }

        function updateForm(form) {
            FormService
                .updateFormById(form._id, form)
                .then(function(response){
                  init();
                });
        }

        function deleteForm(index) {
            FormService
                .deleteFormById(vm.forms[index]._id)
                .then(function(response){
                    init()
                });
        }

        function selectForm(index) {
            vm.currForm = {
                "_id": vm.forms[index]._id,
                "title": vm.forms[index].title,
                "userId": vm.forms[index].userId,
                "fields": vm.forms[index].fields
            }
        }
    }
})();