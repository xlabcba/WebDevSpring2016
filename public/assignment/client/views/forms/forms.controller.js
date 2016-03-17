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
            FormService
                .createFormForUser(currUser._id, form)
                .then(function(response){
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
            vm.currForm = vm.forms[index];
        }
    }
})();