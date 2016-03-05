/**
 * Created by lixie on 16/3/4.
 */

(function() {
    angular
        .module("DataModelApp")
        .controller("CommentController", CommentController);

    function CommentController($rootScope, $scope, FormService) {

        var currUser = $rootScope.currUser;
        var selectedFormIndex = -1;
        $scope.forms = [];
        $scope.currForm = {};
        $scope.currForm = {"_id": "0", "title":"", "userId": currUser._id};

        FormService.findAllFormsForUser(currUser._id, function (forms) {
            $scope.forms = forms;
        });

        $scope.addForm = function () {
            var currForm = {
                _id : $scope.currForm._id,
                title: $scope.currForm.title,
                userId: $scope.currForm.userId
            };
            FormService.createFormForUser(currForm.userId, currForm, function(currForm) {
                FormService.findAllFormsForUser(currUser._id, function (forms) {
                    $scope.forms = forms;
                });
                $scope.currForm = {"_id": "0", "title":"", "userId": currUser._id};
                selectedFormIndex = -1;
            });
        }

        $scope.updateForm = function () {
            if (selectedFormIndex >= 0) {
                var currForm = {
                    _id : $scope.currForm._id,
                    title: $scope.currForm.title,
                    userId: $scope.currForm.userId
                };
                FormService.updateFormById(currForm._id, currForm, function(currForm) {
                    FormService.findAllFormsForUser(currUser._id, function (forms) {
                        $scope.forms = forms;
                    });
                    $scope.currForm = {"_id": "0", "title":"", "userId": currUser._id};
                    selectedFormIndex = -1;
                });
            }
        }

        $scope.deleteForm = function (index) {
            var delForm = {
                _id : $scope.forms[index]._id,
                title: $scope.forms[index].title,
                userId: $scope.forms[index].userId
            };
            FormService.deleteFormById(delForm._id, function(forms) {
                if ($scope.forms[index]._id === $scope.currForm._id){
                    $scope.currForm = {"_id": "0", "title":"", "userId": currUser._id};
                    selectedFormIndex = -1;
                }
                FormService.findAllFormsForUser(currUser._id, function (forms) {
                    $scope.forms = forms;
                });
            });
        }

        $scope.selectForm = function (index) {
            selectedFormIndex = index;
            $scope.currForm = {
                "_id": $scope.forms[selectedFormIndex]._id,
                "title": $scope.forms[selectedFormIndex].title,
                "userId": $scope.forms[selectedFormIndex].userId
            };
        }
    }
})();
