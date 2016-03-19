/**
 * Created by lixie on 16/3/17.
 */

module.exports = function(app, formModel) {

    app.get("/api/assignment/form/:formId/field", getAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);
    app.put("/api/assignment/form/:formId/field", updateFieldsForForm);


    function getAllFieldsForForm(req, res) {
        var formId = req.params.formId;
        var fields = formModel.findAllFieldsForForm(formId);
        res.json(fields);
    }

    function getFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFieldById(formId, fieldId);
        res.json(field);
    }

    function deleteFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = formModel.deleteFieldById(formId, fieldId);
        res.json(fields);
    }

    function createFieldForForm(req, res) {
        var field = req.body;
        var formId = req.params.formId;
        var fields = formModel.createFieldForForm(formId, field);
        res.json(fields);
    }

    function updateFieldById(req, res) {
        var field = req.body;
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var fields = formModel.updateFieldById(formId, fieldId, field);
        res.json(fields);
    }

    function updateFieldsForForm(req, res) {
        var fields = req.body;
        var formId = req.params.formId;
        var newFields = formModel.updateFieldsForForm(formId, fields);
        res.json(newFields);
    }

};